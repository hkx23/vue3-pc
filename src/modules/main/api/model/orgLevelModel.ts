export interface OrgLevelTreeVO extends OrgLevel {
  children: Array<OrgLevelTreeVO>;
}

export interface OrgLevel {
  id?: string;
  levelCode: string;
  levelName: string;
  parentLevelId?: string;
  divisionFlag: number;
  levelSeq: number;
}
