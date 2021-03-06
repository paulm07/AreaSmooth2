import {GameObject, Scene, Input, MathEx} from '../lib/engine';

import {Ship} from './ship';
import {Player} from './player';


export class Enemy extends Ship {
  public type = 'Enemy';
  constructor(public team = 0, public position: { x: number, y: number }) {
    super(team, position);
    // Adjust Stats
    this.hp = 10;
    this.spdMax = 128;
    this.gunReloadTime = 0.5;
    this.gunDamage = 1;

    // Add AI Reaction timer
    this.timer.addTimer('react');

    // Controls
    this.moving = true;
    this.shooting = true;
  }
  update(scene: Scene, i, deltaTime: number) {
    super.update(scene, i, deltaTime);
    var player: Player = scene.findObjectOfType('Player')[0];

    if (player && this.timer.done('react')) {
      this.timer.set('react', Math.random());
      //ww 0.1 is the reaction time of the enemy
      this.nextRotation = (Math.random() > 0.1) ? this.nextRotation : MathEx.getAngleTwoPoints(this.position.x, this.position.y, player.position.x, player.position.y);
    }
    if (this.isDestoryed == true)
    {
      player.killCount ++;
    }
  }
}
