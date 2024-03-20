import {Component, OnDestroy, OnInit} from '@angular/core';
import {Admin} from "../../core/admin";
import {PermissionsService} from "../../core/services/permissions/permissions.service";
import {EditAdminService} from "../../core/services/edit-admin/edit-admin.service";
import {Router} from "@angular/router";
import {TelegramService} from "../../core/services/telegram/telegram.service";
import {AdminsListService} from "../../core/services/admins/admins-list.service";
import {Chat} from "../../core/chat";
import {ChannelsService} from "../../core/services/channels/channels.service";
import { forkJoin, map, mergeMap} from "rxjs";

@Component({
  selector: 'app-edit-admin-permissions-page',
  templateUrl: './edit-admin-permissions-page.component.html',
  styleUrl: './edit-admin-permissions-page.component.scss',
})
export class EditAdminPermissionsPageComponent implements OnInit, OnDestroy {

  private readonly admin: Admin;
  private permissions: any;

  private adminChats: Chat[] = [];

  constructor(private permissionsService: PermissionsService,
              private editAdminService: EditAdminService,
              private telegram: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private adminsListService: AdminsListService) {

    this.admin = this.editAdminService.getAdmin();
    this.permissionsService.setCurrentAdminPermissions(this.admin?.permissions);
    this.goBack = this.goBack.bind(this);
  }

  getAdmin() {
    return this.admin;
  }

  savePermissions() {

    let formData = new FormData();
    const requests: any[] = [];
    const tempChats = this.adminChats;

      tempChats.map((chat) => {
        const permissions = this.permissionsService.getCurrentChatPermissions(chat.chatId);
        const validPermissions = {
          show_admins: permissions.selectAdminFromList,
          create_competition: permissions.actionWithCompetition,
          edit_permissions: permissions.editPermission
        }

        formData.append('permissions', JSON.stringify(validPermissions));
        formData.append('userid', chat.currentAdminId)
        formData.append('chatid', chat.chatId)
        formData.append('owner', chat.ownerId)
        requests.push(this.adminsListService.savePermissions(formData));

        formData = new FormData();
      });

      forkJoin(requests).subscribe(responses => {
        this.router.navigate(['/admins']);
      }, error => {
        console.error(error);
      });
    }

    getAdminPermissions(){
        const formData = new FormData();

        const permissions = this.admin.permissions;
        const userid = this.admin.id;

        const validPermissions = {
            show_admins: permissions.selectAdminFromList,
            create_competition: permissions.actionWithCompetition,
            edit_permissions: permissions.editPermission
        }

        formData.append('permissions', JSON.stringify(validPermissions));
        formData.append('userid', userid);

        return formData;
    }

    goBack(){
        this.router.navigate(['admins/']);
    }

    ngOnDestroy(): void {
        this.telegram.BackButton.offClick(this.goBack);
    }

    ngOnInit(): void {
        this.getChats();
        this.telegram.BackButton.show();
        this.telegram.BackButton.onClick(this.goBack);
    }

    getChats(){
        const currentAdminId = this.admin.id;
        const ownerId = localStorage.getItem('user_id');

        if(ownerId && currentAdminId){
            const formData = new FormData();
            formData.append('user_id', currentAdminId);
            formData.append('owner_id', ownerId);

            this.adminsListService.getHiredAdminChats(formData).pipe(
                mergeMap(response => {
                    const chatRequests = response.results.map((chat: any) =>
                        this.setChatName(chat.chatid).pipe(
                            map(additionalInfo => {
                              console.log(additionalInfo)
                                const permissions = JSON.parse(chat.rights);

                                this.permissionsService.setCurrentChatPermissions(chat.chatid, {
                                  actionWithCompetition: permissions.create_competition,
                                  editPermission: permissions.edit_permissions,
                                  selectAdminFromList: permissions.show_admins
                                })

                                return new Chat(chat.chatid, chat.userid, chat.owner, permissions, additionalInfo.results[0].name);
                            })
                        )
                    );
                    return forkJoin(chatRequests);
                })
            ).subscribe((completeChats:any) => {
              console.log(completeChats)
              this.adminChats = completeChats;
            });
        }
    }

    private setChatName(chatId: string) {
        const formData = new FormData();

        const botid = localStorage.getItem('botid');

        formData.append('chat_ids', chatId);
        formData.append('botid', botid || '');

        return this.channelsService.getChannels(formData);
    }

    addChat() {
        this.router.navigate(['admins/add-chat', this.admin.id]);
    }
    getChatList() {
      return this.adminChats;
    }
}
