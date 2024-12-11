import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Router } from '@angular/router';
import { Player } from '../model/player.model'; // Import the Player model

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {
  players: Player[] = [];  // Use the Player model here

  constructor(private playerService: PlayerService, private router: Router) {}

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getAllPlayers().subscribe((data: Player[]) => {  // Use Player model in the service call
      this.players = data;
    });
  }

  deletePlayer(id: number): void {
    if (confirm('Are you sure you want to delete this player?')) {
      this.playerService.deletePlayer(id).subscribe(() => {
        alert('Player deleted successfully!');
        this.loadPlayers();
      });
    }
  }

  navigateToAddPlayer(): void {
    this.router.navigate(['/player-form']);
  }

  navigateToEditPlayer(id: number): void {
    this.router.navigate(['/player-form', id]);
  }
}
