// tslint:disable:max-line-length

export const REGISTER_COMM_TARGET = "REGISTER_COMM_TARGET";
export const COMM_OPEN            = "COMM_OPEN";
export const COMM_MESSAGE         = "COMM_MESSAGE";

export interface RegisterCommTargetAction   { type: "REGISTER_COMM_TARGET"; name: string; handler: string }
export interface CommOpenAction             { type: "COMM_OPEN"; target_name: string; target_module: string; data: any; metadata: any; comm_id: string; buffers?: any }
export interface CommMessageAction          { type: "COMM_MESSAGE"; data: any; comm_id: string; buffers?: any }

export const commOpenAction = (message: { content: CommOpenAction; blob?: any; buffers?: any }): CommOpenAction => ({
  type: COMM_OPEN,
  comm_id: message.content.comm_id,
  data: message.content.data,
  metadata: message.content.metadata,
  target_name: message.content.target_name,
  target_module: message.content.target_module,
  // Pass through the buffers
  buffers: message.blob || message.buffers
  // NOTE: Naming inconsistent between jupyter notebook and jmp
  //       see https://github.com/n-riesco/jmp/issues/14
  //       We just expect either one
});


export const commMessageAction = (message: { content: CommMessageAction; blob?: any; buffers?: any }): CommMessageAction => ({
  type: COMM_MESSAGE,
  comm_id: message.content.comm_id,
  data: message.content.data,
  // Pass through the buffers
  buffers: message.blob || message.buffers
  // NOTE: Naming inconsistent between jupyter notebook and jmp
  //       see https://github.com/n-riesco/jmp/issues/14
  //       We just expect either one
});
