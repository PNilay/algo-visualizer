import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Walkthroughinfo } from 'src/app/models/walkthroughinfo';

@Component({
  selector: 'app-walkthrouh-tutorial',
  templateUrl: './walkthrouh-tutorial.component.html',
  styleUrls: ['./walkthrouh-tutorial.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WalkthrouhTutorialComponent implements OnInit {
  @Input('walkthrough_isShow') isShow: boolean = true;
  @Output() reset_tutorial: EventEmitter<boolean> = new EventEmitter();

  touch_btn_val: string = 'For Touch Devices';
  color_representation: string = `

  <div class="text-medium-light subtitle-padding">
    Color in grid represents type of Node/Block. Here are the mapping of each color with it\'s meaning.
    <div class="main_color_rep" style="margin-top:20px;">
    <div class="flex-box-item">
        <div class="start_node1 node-box"></div>
        <div class="start_node_txt">Start Node</div>
    </div>
    <div class="flex-box-item-right">
        <div class="gole_node node-box" ></div>
        <div class="gole_node_txt">Gole Node</div>
    </div>
    <div class="flex-box-item">
        <div class="blocked_node node-box"></div>
        <div class="blocked_node_txt">Blocked/Wall Node</div>
    </div>
    <div class="flex-box-item-right">
        <div class="toll_node node-box"></div>
      <div class="toll_node_txt">Toll Node</div>
    </div>

    <div class="flex-box-item">
        <div class="unvisited_node node-box"></div>
        <div class="unvisited_node_txt">Unvisitd Node</div>
    </div>
    <div class="flex-box-item-right">
        <div class="path_node node-box"></div>
      <div class="path_node_txt">Path Node</div>
    </div>
    <div class="flex-box-item2">
        <div class="visited_node visited_node1 node-box"></div>
        <div class="visited_node visited_node2 node-box"></div>
        <div class="visited_node visited_node3 node-box"></div>

        <div class="visited_node_txt">Visited Nodes</div>
    </div>
</div>
  </div>
  `;

  wall_block_touch: string = `
  <div class="text-medium-light touch-screen-wall">
      To create wall block on touch screen devices, follow below steps:
      <ol>
        <li>Uncheck "Touch to Create Toll Node" checkbox under "Advance Options" tab on navbar to enable touch to create wall capability.</li>
        <img src="assets/Screenshot (21).png" width="70%" height="50%" class="center-advance-opt-img">
        <li>Tap on cell to create wall node</li>
      </ol>
  </div> `;

  wall_block_click: string = `
  <div class="text-medium-light subtitle-padding wallnode_txt1">
  Left click on cell to create wall node in gridworld.
  <div class="wallnode_txt2 text-small-light">
  Wall nodes are impossible to pass through, therefore path between start and gole node will never include them.
  </div>
  <div class="text-small-light">
  Mazes and patterns of wall nodes can be generated using the "Maze and Pattern" drop-down menu on navigation bar.
  </div>
  </div>
  <img src="assets/toll_block.gif" width="80%" height="20%">`;

  toll_block_touch: string = `
  <div class="text-medium-light touch-screen-wall">
      To create toll block on touch screen devices, follow below steps:
      <ol>
        <li>Check "Touch to Create Toll Node" checkbox under "Advance Options" tab on navbar to enable touch to create toll capability.</li>
        <img src="assets/Screenshot (21).png" width="70%" height="50%" class="center-advance-opt-img">
        <li>Tap on cell to create toll node</li>
      </ol>
  </div> `;

  toll_block_click: string = `
  <div class="text-medium-light subtitle-padding wallnode_txt1">
      Right click on cell to create toll node in gridworld.
      <div class="tollnode_txt1 text-small-light">
      Unlike Wall nodes, Toll nodes allows path to pass through them,
      but there is extra cost for permission.
      </div>
      <div class="text-small-light">
      Cost of toll node can be set under Options on navbar. Five is selected as default cost. 
      <br>
      Select toll weight before creating toll block. 
      </div> 
  </div>
  <img src="assets/toll_block.gif" width="80%" height="40%">`;

  walkthrough_steps: Walkthroughinfo[] = [
    {
      title: 'AlgoVisualizer',
      body: `
    <div class="text-medium-heavy">
        A fun way to visualize algorithms
    </div>
    <div class="text-medium-light subtitle-padding">
        Welcome, Let Have a walkthrough of this tool
    </div>
    <img src="assets/Visualization_Intro.gif" width="80%" height="50%">`,
      next_btn: true,
      prev_btn: false,
      skip_btn: true,
      touch_btn: false,
    },
    {
      title: 'Visualiztion Buttons',
      body: `
    <img src="assets/algoVisualizer_btns.PNG" width="80%" height="50%">
    <div class="text-medium-light subtitle-padding">
    Use three navigation bar buttons to visualize algorithm, clear visualization and reset/remove grid blocks.
    </div>
    `,
      next_btn: true,
      prev_btn: true,
      skip_btn: true,
      touch_btn: false,
    },
    {
      title: "Colors and It's Representations",
      body: this.color_representation,
      next_btn: true,
      prev_btn: true,
      skip_btn: true,
      touch_btn: false,
    },
    {
      title: 'Wall Blocks',
      body: this.wall_block_click,
      next_btn: true,
      prev_btn: true,
      skip_btn: true,
      touch_btn: true,
    },
    {
      title:
        'Toll Blocks <span class="toll_subtxt">only effactive for waighted algorithms</span>',
      body: this.toll_block_click,
      next_btn: true,
      prev_btn: true,
      skip_btn: true,
      touch_btn: true,
    },
    {
      title: 'Drag and Drop',
      body: `
    <div class="text-medium-light subtitle-padding">
    Left click on Start or Goal cells and drag to move them and see the instant path change between them. 
    </div>
    <img src="assets/drag_drop.gif" width="100%" height="50%">
    `,
      next_btn: false,
      prev_btn: true,
      skip_btn: false,
      touch_btn: false,
    },
  ];

  walkthrough_page: number = 0;
  message: string = 'hello world';
  constructor() {}

  ngOnInit(): void {
    console.log(this.walkthrough_steps);
  }
  onSkip() {
    this.walkthrough_page = 0;
    this.isShow = false;
    this.reset_tutorial.emit(false);
  }
  onPrev() {
    this.walkthrough_page = this.walkthrough_page - 1;
  }
  onNext() {
    this.walkthrough_page = this.walkthrough_page + 1;
  }
  onTouch() {
    if (this.touch_btn_val == 'For Touch Devices') {
      if (
        this.walkthrough_steps[this.walkthrough_page]['title'] == 'Wall Blocks'
      ) {
        this.walkthrough_steps[this.walkthrough_page]['body'] =
          this.wall_block_touch;
        this.touch_btn_val = 'For Click Devices';
      } else {
        this.walkthrough_steps[this.walkthrough_page]['body'] =
          this.toll_block_touch;
        this.touch_btn_val = 'For Click Devices';
      }
    } else {
      if (
        this.walkthrough_steps[this.walkthrough_page]['title'] == 'Wall Blocks'
      ) {
        this.walkthrough_steps[this.walkthrough_page]['body'] =
          this.wall_block_click;
        this.touch_btn_val = 'For Touch Devices';
      } else {
        this.walkthrough_steps[this.walkthrough_page]['body'] =
          this.toll_block_click;
        this.touch_btn_val = 'For Touch Devices';
      }
    }
    console.log(
      'walkthorough page',
      this.walkthrough_steps[this.walkthrough_page]['title']
    );
  }
}
