import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Exhibit} from '../../../model/implementations/exhibit.model';
import {CHOType} from '../../../model/interfaces/objects/cho-type.interface';
import {VremApiService} from '../../../services/http/vrem-api.service';

@Component({
  selector: 'app-exhibit-form',
  templateUrl: './exhibit-form.component.html',
  styleUrls: ['./exhibit-form.component.scss']
})
export class ExhibitFormComponent implements OnInit {

  exhibitForm: FormGroup;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private _vrem_service: VremApiService ) { }

  ngOnInit() {
    this.exhibitForm = this.fb.group({
      artCollection: ['classics'],
      name: [''],
      description: [''],
      type: ['IMAGE'],
      exhibitFile: [null],
      size_width: [''],
      size_height: [''],
      light: [true]
    });

  }

  onFileChange(event) {
    const reader = new FileReader();

    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.exhibitForm.patchValue({
          exhibitFile: reader.result,
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        console.log(file.name);
      };
    }
  }

  onSubmit() {
    /*
    let exhibit = new Exhibit(
      0,
      this.exhibitForm.get('name').value,
      <CHOType>this.exhibitForm.get('type').value,
      this.exhibitForm.get('description').value,
      this.exhibitForm.get('name').value,

      )
    ;

     */
    // Create new Exhibit
    // Create new ExhibitUpload
    // this._vrem_service.uploadExhibit(exhibitUpload);

    console.log(this.exhibitForm.get('artCollection').value);
  }

}
