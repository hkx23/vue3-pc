import type { CardListResult, ListResult } from '@/api/model/listModel';

const Api = {
  BaseList: '/api/get-list',
  CardList: '/api/get-card-list',
};

export function getList() {
  return http.get<ListResult>(Api.BaseList);
}

export function getCardList() {
  return http.get<CardListResult>(Api.CardList);
}
