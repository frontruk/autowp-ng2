import { 
  Component,
  Input,
  OnInit,
  OnChanges,
  ElementRef,
  ViewChild,
  forwardRef,
  SimpleChanges,
  Output,
  EventEmitter,
  Renderer
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

// Importing Drag Module and widgets
import { DndComponent } from '../dnd/dnd.component';
import { TextComponent } from '../dnd/text/text.component';

// These import are for JQ function below
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';


export const EDITOR_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LayoutComponent),
  //  useExisting: forwardRef(() => EditorComponent),
  multi: true
};



@Component({
  selector: 'layout',
  template:  ` 


	{{ content }}
	<Br />

	<div class="wysiwyg-editor__container">
	ddddd
	  <div class="wysiwyg-editor__src-container" *ngIf="!editMode">
	    <textarea [value]="content" class="wysiwyg-editor__src"></textarea>
	  </div>
	  adsasdasd
	  <div class="wysiwyg-editor__content" #editor contenteditable *ngIf="!editMode"
	      (keyup)="onContentChanged()"
	      (change)="onContentChanged()"
	    
	  ></div>
	  <!-- ORGIN
	  <div class="wysiwyg-editor__content" #editor contenteditable *ngIf="!editMode"
	      (keyup)="onContentChanged()"
	      (change)="onContentChanged()"
	      (blur)="onBlur()"
	  ></div> -->
	  asdas
	</div>

	<div class="panel panel-success">
		  <div class="panel-body" dnd-sortable-container [sortableData]="containers" [dropZones]="['container-dropZone']">
		      
		        <div *ngFor="let container of containers; let i = index" 
		             dnd-sortable [sortableIndex]="i" 
		             [dragEnabled]="dragOperation" 
		             (onDragSuccess)="onMouseUp($event)"
		               (onDragEnter)="onDragEnter(widget, $event)"
		             class="item-container-wrapper"
		             >
		            <div class="panel-heading">
		               Menu items for the ROW ( ID:  {{container.id}}, Drag operation : {{dragOperation}} )<a (mousedown)="onMouseDown()">move</a>
		            </div>
		            
		           <div dnd-sortable-container [sortableData]="container.widgets" [dropZones]="['widget-dropZone']" class="item-container">
		               
		                <div *ngFor="let widget of container.widgets; let j = index" 
		                     class="item-column list-group-item " 
		                     dnd-sortable [sortableIndex]="j" 
		                     [dragEnabled]="!dragOperation" 
		                     (onDragEnter)="onDragEnter(widget, $event)" 

		                     (dblclick)="eventEmitDoubleClick(widget, container.widgets)"
			         contenteditable="true"
		                     >
		                    	
		                    	 <div class="item-item" > 
		                             {{widget.name}}
		                        </div>
		                       

		                </div>
		               
		            </div>
		        </div>
		  </div>	
	</div>

<style>
    /* Color to identify */
    .item-container-wrapper {background-color:darkcyan; position: relative;}
    .item-container{background-color: blue}
    .item-column {background-color:pink; }
    .item-item {background-color: red;}

    /*temporal CSS*/
    .item-column{ display: inline-block;vertical-align: top;}
   /* .panel-heading{ position: absolute; top: -20px;z-index: 10;}*/
    
    /*temporal width*/
    .item-column, .item-item{ width: 200px;}
    .item-column { height: 200px; }
    
</style>

 ` 
  ,
  styleUrls: ['./layout.component.css'],
  providers: [EDITOR_VALUE_ACCESSOR]
})


export class LayoutComponent  implements OnInit, ControlValueAccessor {


        // Drag and Drop definitions
        dragOperation: Boolean = false;
        contenteditable: Boolean = false;
       

        containers: Array<any> = [];
        content: string;

	eventEmitDoubleClick(widget, containerWidgets) {
		//this.dragEnabled: true;
		 // dragEnabled= "dragOperation" ;
		 //event.target.
		if(this.dragOperation){
		  this.dragOperation = false;
		  this.contenteditable = true;
		}else{ 
		 this.dragOperation = true;
		  this.contenteditable = false;
		}	
		 console.log('index',widget.index)
		console.log('widget is ',widget);
		console.log('widget container is ',containerWidgets);


		console.log('double click has happened');
		//this.eventEmitterDoubleClick.emit(event);
	}

        drop(item){
              var target = item.mouseEvent.target,
                  index;
          
                if(target.classList.contains('row')) {
                    index = target.getAttribute('data-index');
                }
          
                if(target.classList.contains('item') && target.parentNode.classList.contains('row')) {
                    index = target.parentNode.getAttribute('data-index');
                }
                
                if(index) {
                    console.log(this.containers);
                    console.log(this.containers[index]);
                    this.containers[index].widgets.push( item.dragData);
                } else {
                    this.containers.push([ item.dragData]);
                }
         }
         onDropSuccess(widget: any, event: any) {
            this.dragOperation = false;
            console.log('onDropSuccess', widget, event);
         }
         
         onDragStart(widget: any, event: any) {
            console.log('onDragStart', widget, event);
         }
         
         onDragEnter(widget: any, event: any) {
            console.log('onDragEnter', widget, event);
         }
         
         onDragSuccess(widget: any, event: any) {
            console.log('onDragSuccess', widget, event);
         }
         
         onDragOver(widget: any, event: any) {
            console.log('onDragOver', widget, event);
         }
         
         onDragEnd(widget: any, event: any) {
            console.log('onDragOver', widget, event);
         }
         onDragLeave(widget: any, event: any) {
            console.log('onDragLeave', widget, event);
         }

         onMouseDown(){
            this.dragOperation = true;
            console.log('mouse down');
         }
         
         onMouseUp(event: any){
            console.log(event);
            this.dragOperation = false;
         }

  
      

	//********* Editor functions ********//

	subscriptions: Subscription[] = []
        	//containers: Array<any> = [];
        	//content: string;

  	

 	@ViewChild('editor') container: ElementRef;

     
	    ngOnInit() {
	/*      
	        document.execCommand('defaultParagraphSeparator', false, 'p');
	        ['mouseup', 'keydown', 'keyup'].forEach(event => {
	          this.subscriptions.push(Observable
	            .fromEvent(this.container.nativeElement, event)
	            .debounceTime(60)
	            .subscribe(e => {
	             // this.refreshActiveButtons();
	               //  const tags = this.getTagsRecursive(document.getSelection().focusNode); //NEED TO LINK TO THE MENU
	                // this.buttons.forEach(x => x.active = tags.indexOf(x.tag.toUpperCase()) > - 1);  //NEED TO LINK TO THE MENU
	            }));
	        });
	*/       
	  }


	onCommandExecuted() {
	    this.onContentChanged();
	  //  this.refreshActiveButtons()
	  }
	 onContentChanged() {
	     this.content = this.container.nativeElement.innerHTML;
	     this.propagateChange(this.content);
	  }
	 writeValue(value: any) {
	    if (value) {
	      this.content = value;
	      this.renderer.setElementProperty(this.container.nativeElement, 'innerHTML', this.content);
	    }
	  }


	  propagateChange: any = (_: any) => { };

	 registerOnChange(fn: any) {
	          this.propagateChange = fn;
	 }

	registerOnTouched() { }

	ngOnDestroy() {
		this.subscriptions.forEach(subscription => subscription.unsubscribe());
	}

	// One consturtor for both uses
	constructor(private renderer: Renderer){
	          this.containers.push(new Container(1, 
	          [new Widget('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam orci, dignissim sit amet facilisis sed, pulvinar sed ex. Nulla posuere quis orci sed ultrices. Aliquam lobortis placerat magna in tempor. Suspendisse potenti. Cras dictum bibendum lectus vitae convallis. Nullam pretium nunc id orci viverra auctor')]));
	          this.containers.push(new Container(2, [new Widget('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam orci, dignissim sit amet facilisis sed, pulvinar sed ex. Nulla posuere quis orci sed ultrices. Aliquam lobortis placerat magna in tempor. Suspendisse potenti. Cras dictum bibendum lectus vitae convallis. Nullam pretium nunc id orci viverra auctor')]));
	          
	}

}
class Container {
    constructor(public id: Number, public widgets: Array<Widget>) {}
}
class Widget {
    constructor(public name: string) {}
}
