export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface<T> {
  errors: FieldsErrors;
  validatedData: T;
  validate(data: any): boolean;
}
