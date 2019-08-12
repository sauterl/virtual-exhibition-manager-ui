import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {EditorService} from '../../../services/editor/editor.service';
import {Exhibition} from '../../../model/implementations/exhibition.model';
import {Room} from '../../../model/implementations/room.model';
import {Wall} from '../../../model/implementations/wall.model';
import {Exhibit} from '../../../model/implementations/exhibit.model';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';
import {Vector3f} from '../../../model/interfaces/general/vector-3f.model';
import {VremApiService} from '../../../services/http/vrem-api.service';
// import * as Two from 'two.js';

declare var Two: any;
declare var $: any;

@Component({
  selector: 'app-edit-exhibition-visual',
  templateUrl: './edit-exhibition-visual.component.html',
  styleUrls: ['./edit-exhibition-visual.component.scss']
})
export class EditExhibitionVisualComponent implements AfterViewInit{

  @ViewChild('vis', {read: ElementRef}) vis_elem: ElementRef;
  private two_global: any;
  private art_global: any;
  private two_width: number;
  private two_height: number;
  private pix_per_m: number;

  ngAfterViewInit(): void {
    // Get room size and calculate width to height ratio.
    let size_room: Vector3f;
    this._roomDataSources.subscribe(x => size_room = x[0].size);
    const ratio_wall = size_room.x / size_room.y;

    const elem = this.vis_elem.nativeElement;
    const ratio_elem = elem.clientWidth / elem.clientHeight;

    if (ratio_wall > ratio_elem) {
      this.two_width = elem.clientWidth;
      this.two_height = this.two_width / ratio_wall;
      this.pix_per_m = this.two_width / size_room.x;
      //elem.style.height = this.two_height;
    } else {
      this.two_height = elem.clientHeight;
      this.two_width = this.two_height * ratio_wall;
      this.pix_per_m = elem.clientHeight / size_room.y;
      elem.style.width = this.two_width;
    }

    console.log(this.two_width);
    console.log(this.two_height);

    let params = {width: this.two_width, height: this.two_height};
    this.two_global = new Two(params).appendTo(elem);



    let wall = this.two_global.makeRectangle(0, 0, this.two_width, this.two_height);
    wall.center();

    wall.translation.set(this.two_global.width / 2, this.two_global.height / 2);
    wall.scale = 1;
    wall.fill = '#EEEEEE';
    wall.noStroke();

    this.art_global = this.two_global.makeGroup();
    this.two_global.update();
  }


  /** The {NestedTreeControl} for the per-room tree list. */
  private _treeControl = new NestedTreeControl<any>(node => {
    if (node instanceof Room) {
      return [node.walls, node.exhibits];
    } else if (node instanceof Wall) {
      return node.exhibits;
    } else if (node instanceof Exhibit) {
      return [];
    } else {
      return node;
    }
  });

  /** The data source for the per-room tree list. */
  private _roomDataSources: Observable<Room[]>;
  private _exhibits: Observable<Exhibit[]>;

  /** Helper functions to render the tree list. */
  public readonly isWallFiller = (_: number, node: (Room | Wall | Exhibit)) => Array.isArray(node) && _ === 0;
  public readonly isExhibitFiller = (_: number, node: (Room | Wall | Exhibit)) => Array.isArray(node)  && _ === 1;
  public readonly isRoom = (_: number, node: (Room | Wall | Exhibit | FillerNode)) => node instanceof Room;
  public readonly isWall = (_: number, node: (Room | Wall | Exhibit | FillerNode)) => node instanceof Wall;
  public readonly isExhibit = (_: number, node: (Room | Wall | Exhibit | FillerNode)) => node instanceof Exhibit;

  /**
   * Default constructor.
   *
   * @param _editor Reference to the {EditorService}
   */
  constructor(private _editor: EditorService, private _vrem_service: VremApiService) {
    this._roomDataSources = this._editor.currentObservable.pipe(map( e => e.rooms));
    this._exhibits = this._vrem_service.listExhibits();
  }

  /**
   * Getter for the @type {Exhibition}.
   */
  get exhibition(): Observable<Exhibition> {
    return this._editor.currentObservable;
  }

  /**
   * Getter for the inspected element.
   */
  get inspected(): Observable<(Exhibition | Room | Wall | Exhibit)> {
    return this._editor.inspectedObservable;
  }

  /**
   * Getter for the tree control.
   */
  get treeControl(): NestedTreeControl<(Room | Wall | Exhibit)> {
    return this._treeControl;
  }

  /**
   * Creates and adds a new {Room} to the current {Exhibition}.
   */
  public addNewRoom() {
    this._editor.current.addRoom(Room.empty());
  }

  /**
   * Deletes the provided {Room} from the current {Exhibition}
   *
   * @param r The {Room} to delete.
   */
  public removeRoom(r: Room): void {
    this._editor.current.deleteRoom(r);
  }

  /**
   * Returns the name of type of the currently inspected element.
   *
   * @return Type of the inspected element.
   */
  get selectedType(): Observable<string> {
    return this.inspected.pipe(
      map(i => {
        if (i instanceof Exhibit) {
          return 'Exhibit';
        } else if (i instanceof Exhibition) {
          return 'Exhibition';
        } else if (i instanceof Room) {
          return 'Room';
        } else if (i instanceof Wall) {
          return 'Wall';
        } else {
          return 'Nothing';
        }
      })
    );
  }

  /**
   *
   */
  get isSelectedExhibition(): Observable<boolean> {
    return this.inspected.pipe(map(e => e  instanceof Exhibition));
  }

  /**
   *
   */
  get isSelectedRoom() {
    return this.inspected.pipe(map(e => e  instanceof Room));
  }

  /**
   *
   */
  get isSelectedWall() {
    return this.inspected.pipe(map(e => e  instanceof Wall));
  }

  /**
   *
   */
  get isSelectedExhibit() {
    return this.inspected.pipe(map(e => e  instanceof Exhibit));
  }

  /**
   *
   * @param event
   * @param rw
   * @param e
   */
  public removeExhibitClicked(event: MouseEvent, e: Exhibit) {
    e._belongsTo.removeExhibit(e);
    event.stopPropagation();
  }

  /**
   * Called whenever a user clicks a {Exhibition}.
   * @param event The mouse event.
   * @param exhibition The {Exhibition} that has been clicked.
   */
  public exhibitionClicked(event: MouseEvent, exhibition: Exhibition) {
    this._editor.inspected = this._editor.current;
    event.stopPropagation();
  }

  /**
   * Called whenever a user clicks a {Exhibit}.
   * @param event The mouse event.
   * @param exhibit The {Exhibit} that has been clicked.
   */
  public exhibitClicked(event: MouseEvent, exhibit: Exhibit) {
    this._editor.inspected = exhibit;
    event.stopPropagation();
  }


  /**
   * Called whenever a user clicks a {Room}.
   * @param event The mouse event.
   * @param room The {Room} that has been clicked.
   */
  public roomClicked(event: MouseEvent, room: Room) {
    this._editor.inspected = room;
    event.stopPropagation();
  }

  /**
   * Called whenever a user clicks a {Wall}.
   * @param event The mouse event.
   * @param wall The {Wall} that has been clicked.
   */
  public wallClicked(event: MouseEvent, wall: Wall) {
    this._editor.inspected = wall;
    event.stopPropagation();
    this.drawWall(wall);
  }

  drawWall(wall: Wall): void {
    const two = this.two_global;

    two.remove(this.art_global);
    this.art_global = two.makeGroup();


    let exhibit: any;
    for (exhibit in wall.exhibits) {

      let e = wall.exhibits[exhibit];

      let art = two.makeRectangle(e.position.x * this.pix_per_m, e.position.y * this.pix_per_m, e.size.x * this.pix_per_m, e.size.y * this.pix_per_m);
      let p = this._vrem_service.urlForContent(e.path);
      console.log(p);
      let image = two.makeTexture(this._vrem_service.urlForContent(e.path));
      art.fill = image;
      art.stroke = 'red';
      art.center();
      this.art_global.add(art);
      two.update();
      addInteractivity(art);
    }

    function addInteractivity(shape) {

      let offset_x: number;
      let offset_y: number;

      const drag = function(e) {
        e.preventDefault();
        let x = e.clientX - offset_x;
        let y = e.clientY + pageYOffset - offset_y;
        shape.translation.set(x, y);
        two.update();
      };
      const dragEnd = function(e) {
        e.preventDefault();
        $(window)
          .unbind('mousemove', drag)
          .unbind('mouseup', dragEnd);
      };

      $(shape._renderer.elem)
        .css({
          cursor: 'pointer'
        })
        .bind('mousedown', function(e) {
          e.preventDefault();

          offset_x = e.clientX - shape.translation.x;
          offset_y = e.clientY - shape.translation.y;
          $(window)
            .bind('mousemove', drag)
            .bind('mouseup', dragEnd);
        });
    }
  }

}


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FillerNode {
  walls: Wall[];
  exhibits: Exhibit[];
}
