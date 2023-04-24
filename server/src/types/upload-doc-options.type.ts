export type UploadDocOptions = {
    data: DocData;
    attributes?: DocAttributes;
    options?: UploadOptions;
};

type DocData = {
    FileName: string;
    FileType: string;
    Data: string;
    ExternalUserID: string;
};

type DocAttributes = {
    DocumentDescription: DocDescription;
};

type DocDescription = {
    Department: string;
    Verifier: string;
    Type: string;
    Work: string;
    ShortReport: boolean;
    Authors: WorkAuthors[];
};

type WorkAuthors = {
    Surname: string;
    OtherNames: string;
    PersonIDs: { CustomID: number };
};

type UploadOptions = {
    AddToIndex: boolean;
    FolderId: number;
    ToStorage: boolean;
    FromUser: string;
    OcrExtraction: boolean;
};
