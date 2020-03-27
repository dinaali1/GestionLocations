import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'voiture',
    name: 'Voiture',
    type: 'link',
    icon: 'commute'
  },
  {
    state: 'client',
    name: 'Client',
    type: 'link',
    icon: 'face'
  },
  {
    state: 'location',
    name: 'Location',
    type: 'link',
    icon: 'compare_arrows'
  },
  {
    state: 'statistiques',
    name: 'Statistiques',
    type: 'link',
    icon: 'timeline'
  }
];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu) {
    MENUITEMS.push(menu);
  }
}
