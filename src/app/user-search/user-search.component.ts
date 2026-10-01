import { Component, computed, signal } from '@angular/core';

type Role = 'Admin' | 'Editor' | 'Leitor';

interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  online: boolean;
  avatar: string;
}

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

@Component({
  selector: 'app-user-search',
  standalone: true,
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css',
})
export class UserSearchComponent {
  readonly users = signal<User[]>([
    { id: 1, name: 'Ana Beatriz Quissanga', email: 'ana.quissanga@exemplo.ao', role: 'Admin', online: true, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'João Manuel Kiala', email: 'joao.kiala@exemplo.ao', role: 'Editor', online: true, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Mariana Fernandes', email: 'mariana.fernandes@exemplo.ao', role: 'Leitor', online: false, avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, name: 'Carlos Domingos', email: 'carlos.domingos@exemplo.ao', role: 'Editor', online: false, avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { id: 5, name: 'Luzia Neto', email: 'luzia.neto@exemplo.ao', role: 'Admin', online: true, avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
    { id: 6, name: 'Edgar Pedro Cabral', email: 'edgar.cabral@exemplo.ao', role: 'Leitor', online: true, avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
    { id: 7, name: 'Sónia Mendes', email: 'sonia.mendes@exemplo.ao', role: 'Editor', online: false, avatar: 'https://randomuser.me/api/portraits/women/26.jpg' },
    { id: 8, name: 'Paulo Samuel Tchiyuka', email: 'paulo.tchiyuka@exemplo.ao', role: 'Leitor', online: true, avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { id: 9, name: 'Teresa Lopes', email: 'teresa.lopes@exemplo.ao', role: 'Leitor', online: false, avatar: 'https://randomuser.me/api/portraits/women/90.jpg' },
    { id: 10, name: 'Nelson Baptista', email: 'nelson.baptista@exemplo.ao', role: 'Editor', online: true, avatar: 'https://randomuser.me/api/portraits/men/64.jpg' },
  ]);

  readonly searchTerm = signal('');
  readonly role = signal<Role | 'Todos'>('Todos');

  readonly roles: (Role | 'Todos')[] = ['Todos', 'Admin', 'Editor', 'Leitor'];

  readonly filteredUsers = computed(() => {
    const term = normalize(this.searchTerm());
    const role = this.role();

    return this.users().filter((user) => {
      const matchesRole = role === 'Todos' || user.role === role;
      const matchesTerm =
        !term || normalize(user.name).includes(term) || normalize(user.email).includes(term);
      return matchesRole && matchesTerm;
    });
  });

  onSearch(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  clear(): void {
    this.searchTerm.set('');
  }

  resetFilters(): void {
    this.searchTerm.set('');
    this.role.set('Todos');
  }
}
