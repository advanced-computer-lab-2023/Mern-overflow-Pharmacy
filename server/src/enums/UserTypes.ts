export enum UserType {
    GUEST,
    PATIENT,
    PHARMACIST,
    ADMINSTARTOR
}

export const UserTypesNames = new Map<String, UserType>([
    ["Guest", UserType.GUEST],
    ["Patient", UserType.PATIENT],
    ["Pharmacist", UserType.PHARMACIST],
    ["Adminstrator", UserType.ADMINSTARTOR]
]);
