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


@Injectable()
export class menuService {

	toolbarBtns = [{
		'wysiwyg':  [ 
				{id: 0,   
				    name: 'Bold',  
				    icon: 'fa-bold',
				    command: 'bold',   
				    tag: 'b', 
				    active: false, 
				    componentMenuSelector: false,
				 },
				 {id: 1,
				   name:'Italic',
				   icon: 'fa-italic',
				   command: 'italic',  
				   tag: 'i',active: false, 
				   componentMenuSelector: false,
				},
				{id: 2,  
				    name:'Headlines', 
				    icon: 'fa-header',
				    command: 'headlineView',
				    active: false, 
				    componentMenuSelector: false,
				    componentName: HeadingComponent
				}, 
				{id: 3,  
				    name:'Link', 
				    command: 'createlink',
				    icon: 'fa-link',
				    tag: 'a',
				    active: false, 
				    componentMenuSelector: 'links-menu',
				    componentName : LinksComponent
				},
				{id: 4,  
				    name:'Color',
				    icon: 'fa-slack',
				    componentMenuSelector: 'color-menu',
				    command: 'color',
				    active: false, 
				    componentName: ColorSelectorComponent,
				    colorArray: [ '#000000', '#0000ff' ],
				    arrayColors: {color: '#000000', color2: '#999999'}
				},
				{id: 5,  
				    name: 'Typography', 
				    icon: 'fa-font',
				    active: false, 
				    componentMenuSelector: 'typography-menu',
				    componentName : TypographyComponent
				},
				{id: 11,
				    name:'Button Type', 
				    icon: 'fa-battery-empty',
				    active: false, 
				    command: 'createButtons',
				    componentMenuSelector: 'buttontype',
				    componentName: ButtonTypeWidgetComponent
				},
				{id: 12, 
				    name:'HTML', 
				    icon: 'fa-battery-empty'

					
				}	

			    
			],
		'headings':  [
				{
				name: '1',
				command: 'formatBlock',
				options: '<h1>',
				tag: 'h1'
				
				},
				{
				name: '2',
				command: 'formatBlock',
				options: '<h2>',
				tag: 'h2'
				},
				{
				name: '3',
				command: 'formatBlock',
				options: '<h3>',
				tag: 'h3'
				},
				{
				name: '4',
				command: 'formatBlock',
				options: '<h4>',
				tag: 'h4'
				},
				{
				name: '5',
				command: 'formatBlock',
				options: '<h5>',
				tag: 'h5'
				}
			],
		'imgAligmnet': [
				{id: 1,
				        name:'Image left', 
				        icon: 'fa-align-left',
				        componentID : 8},
				{id: 2,
				        name:'Image center', 
				        icon: 'fa-align-center',
				        componentID : 8},
				{id: 3,
				        name:'Image justify', 
				        icon: 'fa-align-justify',
				        componentID : 8},
				{id: 4,
				        name:'Image hero', 
				        icon: 'fa-align-justify',
				        componentID : 8},
				{id: 5,
				        name:'Image right', 
				        icon: 'fa-align-right',
				        componentID : 8
				}
			],
	 	 'ButtonSettings':[
	 	 		{id: 0,
				        name:'Swith button type', 
				        icon: 'fa fa-square-o'
				},
		 		{id: 1,
				        name:'Filled Round button', 
				        icon: 'fa fa-square-o'
				},
				{id: 2,
				        name:'Filled Smooth button', 
				        icon: 'fa fa-square-o'
				},
				{id: 3,
				        name:'Filled Square button', 
				        icon: 'fa fa-square-o'
				},
				{id: 4,
				        name:'Bordered Round button', 
				        icon: 'fa fa-square-o'
				},
				{id: 5,
				        name:'Bordered Smooth button', 
				        icon: 'fa fa-square-o'
				},
				{id: 6,
				        name:'Bordered Square button', 
				        icon: 'fa fa-square-o'
				}
			 ],
		 'Builder':[
		 		{id: 1,
				        name:'Components', 
				        icon: 'fa fa-plus',
				        componentNameString: 'DndComponent';
				        componentID : 8
				},
				{id: 2,
				        name:'Components settings', 
				        icon: 'fa fa-sliders',
				        componentNameString: 'widgetSettingsComponent';
				        componentID : 8
				 }
		 	],
		 'miscellaneous':[
				{id: 1,
				        name:'Examples', 
				        icon: 'fa fa-slideshare',
				         componentNameString: 'ExamplesComponent';
				      
				}
		 	]

		}
	]

   	buttonlist = [
		{id: 0,   title: 'Bold',  icon: 'fa-bold',
		    command: 'bold',   tag: 'b', active: false, 
		    componentMenuSelector: false,
		},
		{id: 1,   title:'Italic',    icon: 'fa-italic',
		   
		   command: 'italic',  tag: 'i',active: false, 


		    componentMenuSelector: false,
		},
		{id: 2,  
		    title:'Headlines', 
		    icon: 'fa-header',
		    command: 'headlineView',
		    active: false, 
		    componentMenuSelector: false,
		    

		    componentName: HeadingComponent
		}, 
		{id: 3,  
		    title:'Link', 
		    command: 'createlink',
		    icon: 'fa-link',
		    tag: 'a',
		    active: false, 
		    componentMenuSelector: 'links-menu',
		    componentName : LinksComponent
		},
		{id: 4,  
		    title:'Color',
		    icon: 'fa-slack',
		    componentMenuSelector: 'color-menu',
		    command: 'color',
		    active: false, 
		    componentName: ColorSelectorComponent,
		    colorArray: [ '#000000', '#0000ff' ],
		    arrayColors: {color: '#000000', color2: '#999999'}
		},
		{id: 5,  
		    title: 'Typography', 
		    icon: 'fa-font',
		    active: false, 
		    componentMenuSelector: 'typography-menu',
		    componentName : TypographyComponent
		},
		/*
		{id: 6,  title:'Media', icon: 'fa fa-picture-o',

		    active: false, 
		    command: 'createMedia',
		    
		    
		    componentMenuSelector: 'media-menu',
		    componentName :  ImagePanelComponent
		},
		*/
		{id: 11,
		    title:'Button Type', 
		    icon: 'fa-battery-empty',
		    active: false, 
		    command: 'createButtons',
		    componentMenuSelector: 'buttontype',
		    componentName: ButtonTypeWidgetComponent
		}
		   
	];

	headinglist = [{
		title: '1',
		command: 'formatBlock',
		options: '<h1>',
		tag: 'h1'
		
	},
	{
		title: '2',
		command: 'formatBlock',
		options: '<h2>',
		tag: 'h2'
	},
	{
		title: '3',
		command: 'formatBlock',
		options: '<h3>',
		tag: 'h3'
	},
	{
		title: '4',
		command: 'formatBlock',
		options: '<h4>',
		tag: 'h4'
	},
	{
		title: '5',
		command: 'formatBlock',
		options: '<h5>',
		tag: 'h5'
	}
	]

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
 			//console.log('getting elements', element)

	                tags = tags || (element && element.tagName ? [element.tagName] : []);
	              //  console.log('inside tags' , tags)

	                if (element && element.parentNode) {
	                  element = element.parentNode;
	               //   console.log('parent node tags' , tags)
	                } else {
	                //	console.log('return tags' , tags)
	                  return tags;
	                }

	                const tag = element.tagName;
	                if (tag === 'DIV') {
	                  return tags;
	                }
	             //    console.log('push tags' , tags)
	                tags.push(tag);
	               //   console.log('return tags recurisve tags' , element, tags)
	                return this.getTagsRecursive(element, tags);
	}



}
