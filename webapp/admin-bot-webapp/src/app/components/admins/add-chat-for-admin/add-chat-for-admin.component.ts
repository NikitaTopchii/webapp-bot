 import {Component, OnDestroy, OnInit} from '@angular/core';
 import {TelegramEntityInterface} from "../../core/telegram-entity/telegram-entity.interface";
 import {TelegramService} from "../../core/services/telegram/telegram.service";
 import {ActivatedRoute, Router} from "@angular/router";
 import {ChannelsService} from "../../core/services/channels/channels.service";
 import {SelectedChannelsService} from "../../core/services/selected-channels/selected-channels.service";
 import {AdminsListService} from "../../core/services/admins/admins-list.service";
 import {NgForOf, NgIf} from "@angular/common";
 import {AdminPermissionsComponent} from "../admin-permissions/admin-permissions.component";
 import {Chat} from "../../core/chat";
 import {PermissionsService} from "../../core/services/permissions/permissions.service";
 import {ChatPermissionsComponent} from "../chat-permissions/chat-permissions.component";
 import {map, of, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-add-chat-for-admin',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AdminPermissionsComponent,
    ChatPermissionsComponent
  ],
  templateUrl: './add-chat-for-admin.component.html',
  styleUrl: './add-chat-for-admin.component.scss'
})
export class AddChatForAdminComponent implements OnInit, OnDestroy{

  private channelsList: TelegramEntityInterface[] = [];

  selectedTelegramEntity = new Set<TelegramEntityInterface>();
  selectedChatEntity = new Set<Chat>();

  selectElementsExist: boolean = false;

  private chatIdsList: number[] = [];

  private adminsChatList = new Map<number, Chat>();

  private currentAdminId: string | null = '';

  constructor(private telegram: TelegramService,
              private router: Router,
              private channelsService: ChannelsService,
              private selectedChannelsService: SelectedChannelsService,
              private adminsListService: AdminsListService,
              private permissionsService: PermissionsService,
              private route: ActivatedRoute) {
    this.goBack = this.goBack.bind(this);
  }

  goBack(){
    this.router.navigate(['admins/edit-admin-permissions']);
  }

  ngOnDestroy(): void {
    this.telegram.BackButton.offClick(this.goBack);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.currentAdminId = params.get('id');
    });
    this.getChatIds();
    this.telegram.BackButton.show();
    this.telegram.BackButton.onClick(this.goBack);
  }

  getChannelsList(){
    return this.channelsList;
  }

  navigateToAddNewChannels() {
    console.log(this.selectedChatEntity)
    this.selectedChatEntity.forEach((chat) => {
      const formData = new FormData();

      chat?.setPermissions(this.permissionsService.getCurrentChatPermissions(chat.chatId));

      const permissions = chat.permissions;

      const validPermissions = {
        show_admins: permissions.selectAdminFromList === null ? false : permissions.selectAdminFromList,
        create_competition: permissions.actionWithCompetition === null ? false : permissions.actionWithCompetition,
        edit_permissions: permissions.editPermission === null ? false : permissions.editPermission
      }

      formData.append('user_id', chat.currentAdminId)
      formData.append('chat_id', chat.chatId);
      formData.append('rights', JSON.stringify(validPermissions))
      formData.append('owner', chat.ownerId);

      this.adminsListService.addChatForHiredAdmin(formData).subscribe(() => {
        this.router.navigate(['admins/edit-admin-permissions'])
      });
    });
  }

  selectTelegramEntity(entity: TelegramEntityInterface) {
    if(entity.selected){
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.delete(entity);

      const chat = this.adminsChatList.get(parseInt(entity.id));

      this.selectedChatEntity.delete(chat || new Chat('', '', ''));
      this.checkSelectedElements();
    }else{
      entity.selected = !entity.selected;
      this.selectedTelegramEntity.add(entity);

      const chat = this.adminsChatList.get(parseInt(entity.id));

      this.selectedChatEntity.add(chat || new Chat('', '', ''));
      this.checkSelectedElements();
    }
  }

  checkSelectedElements(){
    for (const element of this.selectedTelegramEntity) {
      if (element.selected) {
        this.selectElementsExist = true;
        break;
      } else {
        this.selectElementsExist = false;
      }
    }
  }

  getChatIds() {
    const userid = localStorage.getItem('user_id');

    if (userid) {
      const formData = new FormData();
      formData.append('user_id', userid);

      this.adminsListService.getAdminsWithSubscription(formData).pipe(
        map(response => response.results),
        tap(admins => {
          admins.forEach((admin:any) => {
            this.chatIdsList.push(admin.chatid);

            if (this.currentAdminId) {
              const chat = new Chat(
                admin.chatid,
                this.currentAdminId,
                admin.userid,
                {
                  selectAdminFromList: false,
                  actionWithCompetition: false,
                  editPermission: false
                }
              );

              this.permissionsService.setCurrentChatPermissions(admin.chatid, {
                selectAdminFromList: false,
                actionWithCompetition: false,
                editPermission: false
              });

              this.adminsChatList.set(admin.chatid, chat);
            }
          });
        }),
        switchMap(() => {
          const botid = localStorage.getItem('botid');
          if (!botid) {
            return of([]); // Повертаємо пустий Observable, якщо botid відсутній
          }

          const formData = new FormData();
          formData.append('chat_ids', this.chatIdsList.join(','));
          formData.append('botid', botid);

          return this.channelsService.getChannels(formData);
        }),
        map(response => response.results)
      ).subscribe(channels => {
        this.channelsList = channels.map((channel:any) => ({
          id: channel.chatid,
          name: channel.name,
          selected: false
        }));
      });
    }
  }
}
