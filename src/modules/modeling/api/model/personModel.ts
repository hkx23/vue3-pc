export interface PersonList {
  list: Array<PersonModel>;
  total: number;
}

export interface PersonModel {
  id: number;
  personCode: string;
  personName: string;
  mobilePhone: string;
  email: string;
  gender: number;
  state: number;
  genderName: string;
  stateName: string;
}
