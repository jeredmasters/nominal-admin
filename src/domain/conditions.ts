export enum CONDITION_TYPE {
    PROP_EQUALS = 'PROP_EQUALS',
    TAG_EQUALS = "TAG_EQUALS",
    MEETS_ALL = 'MEETS_ALL',
    MEETS_ANY = 'MEETS_ANY'
}
export type VoterCondition = VoterCondition_ValueEquals | VoterCondition_Many;
export interface VoterCondition_ValueEquals {
    type: CONDITION_TYPE.TAG_EQUALS | CONDITION_TYPE.PROP_EQUALS;
    key: string;
    value: string;
    split_lines: boolean;
}
export interface VoterCondition_Many {
    type: CONDITION_TYPE.MEETS_ALL | CONDITION_TYPE.MEETS_ANY;
    conditions: Array<VoterCondition>
}
