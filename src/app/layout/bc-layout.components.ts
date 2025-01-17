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
import {dndService} from '../toolbar/services/dnd.service';

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



<div >{{canvasContainers | json}}</div>

<!-- Canvas -->
<div id="masterLayout" style="height: 200px;width: 100%;background-color: #dedede"
dnd-droppable

[dropZones]="['canvas-dropZone']"

(onDragEnter)="onDragEnter(widget, $event)"
(onDropSuccess)="onDropSuccess(widget, $event,  'canvas')" 

>
	
		<!-- ROW / containers -->
		 <div *ngFor="let row of canvasContainers; let row = index"    class="autowp-rows"    >


			<div 
				*ngFor="let widget of row.widgets; let j = index"  class="autowp-column"
				(onDragEnter)="onDragEnter(widget, $event)"
				>
				{{widget.name}}
			</div>
			
		 </div>
	
</div>

<div >{{containers | json}}</div>


<Br style="clear:both;" />
	<div class="panel panel-success">
	  	  <!-- Block  containers -->
		  <div class="panel-body" dnd-sortable-container [sortableData]="containers" [dropZones]="['container-dropZone']" >
		      
		      <!-- Block  row -->
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
		            	
		            	<!-- Block  column-->
			           <div dnd-sortable-container 
			           	      [sortableData]="container.widgets" 
			           	      [dropZones]="['widget-dropZone']" 
			           	      class="item-container"
				      (onDropSuccess)="onDropSuccess(widget, $event,  'row')" 
				      (dragenter)="onDragEnter('',$event)"	
			           	  >
					               
					               <!-- Block -->
					                <div *ngFor="let widget of container.widgets; let j = index" 
					                     class="item-column list-group-item " 
					                     dnd-sortable [sortableIndex]="j" 
					                     [dragEnabled]="!dragOperation" 


					                     (onDragEnter)="onDragEnter(widget, $event)" 
					                     (onDropSuccess)="onDropSuccess(widget, $event, 'block')" 


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
-->


<style>
.autowp-rows{ width: 100%; background-color: red;}
.autowp-column{ float: left; width: 20%; background-color: green;}

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
	
	currentlyDragged: any;


	// One consturtor for both uses
	constructor(private renderer: Renderer, private _dndService: dndService){
	          this.containers.push(
		          	new Container(1, 
		          	[new Widget('Lorem ipsumrci viverra auctor')]
		          	)
	          );
	          this.containers.push(
	          	new Container(2, 
	          	[new Widget('Lorem ipsumura auctor')]
	          	)
	          );


	          // To get currently dragged widget
	            this._dndService.newDragged$.subscribe(
	              data => {
	                this.currentlyDragged = data; 
	             });
	          
	}


        // Drag and Drop definitions
        dragOperation: Boolean = false;
        contenteditable: Boolean = false;
       
        canvasContainers: Array<any> = [];
        containers: Array<any> = [];
        content: string;


       onDragEnter(widget: any, event: any) {

            console.log('onDragEnter widget', widget);
	console.log('onDragEnter event', event);

            console.log('drag enter containers', this.containers)
        }

       onDropSuccess(widget: any, event: any, droppedOn: string) {
       	console.log('dropped success')
       	if(droppedOn == 'canvas' ){
       		if(this.canvasContainers.length ==  0){
	       		this.canvasContainers.push(
			          	new Container(1, 
			          	[this.currentlyDragged]
			           	)
		           );
       		}else{

	       		this.canvasContainers.push(
			          	new Container(2, 
			          	[this.currentlyDragged]
			           	)
		           );
       		}
       	}
       	console.log('container is sss',this.containers)	
       	

       	console.clear();
       	//Main elements 
	console.log('droppedOn', droppedOn)
	console.log('widget ', widget)
	console.log('Event  ', event)
	console.log('containers', this.containers)

         	if( droppedOn == 'row'){
         		console.log('dropped on', droppedOn)
         	}
         	else if(droppedOn == 'block'){
         		console.log('dropped on ', droppedOn)
         	}
            this.dragOperation = false;
       
            
         }



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
        	alert('dropped')
        	console.log('dropping event', item)
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

         
         onDragStart(widget: any, event: any) {
            console.log('onDragStart', widget, event);
         }
        
   

           chicken(event) {
            console.log('onDragEnter chicken', event);
         
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

	
}
class Container {
    constructor(public id: Number, public widgets: Array<Widget>) {}
}
class Widget {
    constructor(public name: string) {}
}
