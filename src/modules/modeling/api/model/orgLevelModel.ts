export interface OrgLevelTreeVO {
  levelCode: string;
  levelName: string;
  divisionFlag: number;
  levelSeq: number;
  children: Array<OrgLevelTreeVO>;
}

export interface OrgLevel {
  id: number;
  levelCode: string;
  levelName: string;
  parentLevelId: number;
  divisionFlag: number;
  levelSeq: number;
}
