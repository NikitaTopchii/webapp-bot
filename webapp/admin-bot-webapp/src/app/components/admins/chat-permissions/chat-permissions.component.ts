import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PermissionsService} from "../../core/services/permissions/permissions.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-chat-permissions',
  standalone: true,
  imports: [
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  templateUrl: './chat-permissions.component.html',
  styleUrl: './chat-permissions.component.scss'
})
export class ChatPermissionsComponent implements OnChanges{
  @Input() chatId: string = '';

  public permissionsForm: FormGroup;

  public selectAdminFromList = false;
  public actionWithCompetition = false;
  public editPermission = false;


  constructor(private readonly fb: FormBuilder, private permissionsService: PermissionsService) {
    this.permissionsForm = this.getPermissionsForm();
    console.log('chat id in contsructor: ' + this.chatId)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chatId']) {
      this.permissionsForm = this.getPermissionsForm();

      this.permissionsForm.valueChanges.subscribe(() => {
        console.log('permission form was changed , chatid is ' + this.chatId)
        this.permissionsService.checkChatPermissionValuesState(this.permissionsForm);
        this.permissionsService.setCurrentChatPermissions(this.chatId,{
          actionWithCompetition: this.permissionsForm.get('actionWithCompetition')?.value,
          editPermission: this.permissionsForm.get('editPermission')?.value,
          selectAdminFromList: this.permissionsForm.get('selectAdminFromList')?.value
        })
      })
    }
  }

  private getPermissionsForm(){
    this.setCurrentPermissions();
    console.log('1 : ' + this.selectAdminFromList)
    console.log('2 : ' + this.actionWithCompetition)
    console.log('3 : ' + this.editPermission)
    return this.fb.group({
      selectAdminFromList: [this.selectAdminFromList],
      actionWithCompetition: [this.actionWithCompetition],
      editPermission: [this.editPermission]
    })
  }

  setCurrentPermissions(){
    console.log('start getting current permissions + ' + this.chatId)
    const currentAdminPermissions = this.permissionsService.getCurrentChatPermissions(this.chatId);

    console.log('current admin permissions: ')
    console.log('edit permissions: ' + currentAdminPermissions.editPermission)
    console.log('competition actions: ' + currentAdminPermissions.actionWithCompetition)
    console.log('show admins: ' + currentAdminPermissions.selectAdminFromList)


    if(currentAdminPermissions){
      console.log('set current permissions )))')
      this.selectAdminFromList = currentAdminPermissions.selectAdminFromList;
      this.actionWithCompetition = currentAdminPermissions.actionWithCompetition;
      this.editPermission = currentAdminPermissions.editPermission;
    }
  }

  setPermissions(form: FormGroup){
    console.log(form.value)
    this.permissionsService.setCurrentChatPermissions(this.chatId,{
      actionWithCompetition: form.get('actionWithCompetition')?.value,
      editPermission: form.get('editPermissions')?.value,
      selectAdminFromList: form.get('selectAdminFromList')?.value
    })
  }
}
