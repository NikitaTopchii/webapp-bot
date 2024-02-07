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
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['chatId']) {
      this.permissionsForm = this.getPermissionsForm();

      this.permissionsForm.valueChanges.subscribe(() => {
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
    return this.fb.group({
      selectAdminFromList: [this.selectAdminFromList],
      actionWithCompetition: [this.actionWithCompetition],
      editPermission: [this.editPermission]
    })
  }

  setCurrentPermissions(){
    const currentAdminPermissions = this.permissionsService.getCurrentChatPermissions(this.chatId);

    if(currentAdminPermissions){
      this.selectAdminFromList = currentAdminPermissions.selectAdminFromList;
      this.actionWithCompetition = currentAdminPermissions.actionWithCompetition;
      this.editPermission = currentAdminPermissions.editPermission;
    }
  }

  setPermissions(form: FormGroup){
    this.permissionsService.setCurrentChatPermissions(this.chatId,{
      actionWithCompetition: form.get('actionWithCompetition')?.value,
      editPermission: form.get('editPermissions')?.value,
      selectAdminFromList: form.get('selectAdminFromList')?.value
    })
  }
}
