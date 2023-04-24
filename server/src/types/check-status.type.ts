export type CheckStatus = {
    DocId: { Id?: number; External?: string };
    Status: 'None' | 'InProgress' | 'Ready' | 'Failed';
    FailDetails?: string;
    Summary: ReportSummary;
    EstimatedWaitTime?: number;
};

type Score = {
    Plagiarism: number;
    Legal: number;
    SelfCite: number;
    Unknown: number;
};

type ReportSummary = {
    ReportNum: number;
    ReadyTime: Date;
    ReportWebId: string;
    ReadonlyReportWebId: string;
    ShortReportWebId: string;
    DetailedScore: Score;
    BaseScore: Score;
    IsSuspicious: boolean;
    SummaryReportWebId: string;
    ShortFraudReportWebId?: string;
};

// {
//     DocId: { Id: 581160 },
//     Status: 'Ready',
//     Summary: {
//     ReportNum: 1,
//     ReadyTime: 2023-04-21T12:29:06.216Z,
//     Score: 0,
//     ReportWebId: '/report/byLink/apiCorp/580630?v=1&userId=4&validationHash=CCEE103BEDE14189CE3536B50267DF3C55D7671D',
//     ReadonlyReportWebId: '/report/byLink/580630?v=1&userId=4&validationHash=1B1001EA5B26031E358859E6F6C9C85F411BC236',
//     ShortReportWebId: '/report/byLink/short/580630?v=1&userId=4&validationHash=48DC338D676817780A39B61AAAF73423DBBA44D0',
//     DetailedScore: { Plagiarism: 0, Legal: 0, SelfCite: 0, Unknown: 100 },
//     BaseScore: { Plagiarism: 0, Legal: 0, SelfCite: 0, Unknown: 100 },
//     IsSuspicious: false,
//     SummaryReportWebId: '/report/byLink/apiCorp/summary/580630?v=1&userId=4&validationHash=CCEE103BEDE14189CE3536B50267DF3C55D7671D'
// }
