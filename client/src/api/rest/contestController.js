import http from '../interceptor';

const updateContest = (data) => http.post('/contest/updateContest', data);
const setNewOffer = (data) => http.post('/contest/setNewOffer', data);
const setOfferStatus = (data) => http.post('/contest/setOfferStatus', data);
const downloadContestFile = (data) => http.get(`/contest/downloadFile/${data.fileName}`);
const dataForContest = (data) => http.post('/contest/dataForContest', data);
const getCustomersContests = (data) => http.post('/contest/getCustomersContests', { limit: data.limit, offset: data.offset }, {
  headers: {
    status: data.contestStatus,
  },
});

const getActiveContests = ({
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
}) => http.post('/contest/getAllContests', {
  offset, limit, typeIndex, contestId, industry, awardSort, ownEntries,
});

const getContestById = (data) => http.get('/contest/getContestById', {
  headers: {
    contestId: data.contestId,
  },
});

const contestController = {
    updateContest,
    setNewOffer,
    setOfferStatus,
    downloadContestFile,
    dataForContest,
    getCustomersContests,
    getActiveContests,
    getContestById,
}

export default contestController;