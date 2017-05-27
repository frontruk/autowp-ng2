import {HeadingComponent} from '../toolbarOptions/wysiwyg-panel/heading/heading.component';
import {ColorSelectorComponent} from '../toolbarOptions/wysiwyg-panel/color-selector/color-selector.component';
import {LinksComponent} from '../toolbarOptions/wysiwyg-panel/links/links.component';
import {TypographyComponent} from '../toolbarOptions/wysiwyg-panel/typography/typography.component';
import {ImagePanelComponent} from '../toolbarOptions/image-panel/image-panel.component';
import {ExamplesComponent} from '../toolbarOptions/examples/examples.component';
import {BuilderPanelComponent} from '../toolbarOptions/builder-panel/builder-panel.component'
import {ButtonTypeWidgetComponent} from  '../toolbarOptions/wysiwyg-panel/button-type/button-type-widget.component';
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import {widgetsService} from './widgets.service'

@Injectable()
export class wysiwygService {
	constructor ( private _widgetsService: widgetsService){}
	// Disable menu views
	subMenu: boolean = false;
	colorMenu: boolean = false;
	linkMenu: boolean = false;
	createMedia: boolean = false;
	createButtons: boolean = false;

	execCommand(button ){
		
		//console.log('button data', button)
		// enable the menu item
		//this.enableMenu(button, $event ); 
		
		// Decorate HTML
		this.decorateHtml();

		if (button.command === 'wysiwygMenu') {
		
		} else if(button.command === 'color' ){
			this.colorMenu = !this.colorMenu

			this.linkMenu = false;
			this.createMedia = false;
			this.createButtons = false

		}else if( button.command === 'createlink' && this._menuService.getSelected()  === ''){

			this.linkMenu = !this.linkMenu

			this.colorMenu = false;
			this.createMedia = false;
			this.createButtons = false;

			//console.log('testin', this.linkMenu )
			// document.execCommand('insertHtml', false, '<a href="' + options + '">' + options + '</a>');
		}
		else if(button.command === 'createButtons'){
			this.createButtons = !this.createButtons

			this.linkMenu = false;
			this.colorMenu = false;
			this.createMedia = false

		}else {
		 	 document.execCommand(button.command, false, button.options);
		}

		this._widgetsService.loadWidget(button);
		

	}
	

/*
	//Enable Menu
	enableMenu(button, $event){
 		$event.stopPropagation();
		this.buttonlist.forEach(b => {
			//console.log(b);
			  b.active = false;
			//  b.children && b.children.forEach(b => b.active = false);
		});
		button.active = true; 
 	}
*/

	decorateHtml(){
		// get selection
		let selection = this.getSelected()  
		//console.log('selection is', selection);
		//console.log('getting the selected content',document.getSelection().focusNode);
		const tags = this.getTagsRecursive(document.getSelection().focusNode);
		//console.log('tags are', tags);
	}
 	getSelected(){
 		return document.getSelection().toString();
 	}
 	getTagsRecursive(element, tags?: any[]) {
	                tags = tags || (element && element.tagName ? [element.tagName] : []);
	              //  console.log('inside tags' , tags)

	                if (element && element.parentNode) {
	                  element = element.parentNode;
	               //   console.log('parent node tags' , tags)
	                } else {
	                // console.log('return tags' , tags)
	                  return tags;
	                }
	                const tag = element.tagName;
	                if (tag === 'DIV') {
	                  return tags;
	                }
	                // console.log('push tags' , tags)
	                tags.push(tag);
	               //   console.log('return tags recurisve tags' , element, tags)
	                return this.getTagsRecursive(element, tags);
	}



}
