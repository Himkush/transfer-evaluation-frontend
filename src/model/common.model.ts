
export interface Major {
  major_name: 'string';
}
export interface Schools {
  school_name: 'string';
}
export interface States {
  state_name: 'string';
}
export interface TransferCourses {
  transfer_course_id: number;
  subject_number: string;
  title: string;
  school_id: number;
}
export interface Approvers {
  approver_id: number;
  approver_name: string;
}
export interface Majors{
  major_id: number;
  major_name: string;
}
export interface School{
  school_id: number;
  state_name: string;
  school_name: string;
}
export interface MajorRequirement {
  major_req_id: number;
  description: string;
  major_id: number;
}
