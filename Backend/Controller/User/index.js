const userData = require("../../UserData.json");

const onePoint = 50, twoPoint = 100;
const calulatePoint = (trans) => {
    let availablePoints = 0, expirePoint = 0;
    let filterDate = new Date();
    filterDate.setMonth(filterDate.getMonth() - 3);

    trans.forEach((transaction, index, object) => {
        if (new Date(transaction.createdDate) > filterDate) {
            transaction.points = ((transaction.amount > twoPoint) ? ((transaction.amount - twoPoint) * 2) + onePoint :
                (transaction.amount > onePoint && transaction.amount <= twoPoint) ? (transaction.amount - onePoint * 1) : 0);
            availablePoints += new Date(transaction.expiryDate) < new Date() ? 0 : transaction.points;
            expirePoint += new Date(transaction.expiryDate) < new Date() ? transaction.points : 0;
        } else {
            object.splice(index, 1);
        }

    })
    return { availablePoints, expirePoint }
}

//Get selected list field
const selectedList = (list) => {
    let { id, firstName, lastName, contactNumber, transaction } = list;

    let { availablePoints, expirePoint } = calulatePoint(transaction || []);
    return { id, firstName, lastName, contactNumber, availablePoints, expirePoint };
}

const getUsers = (req, res) => {
    //Get selected list field with total available points
    let response = {};
    new Promise((resolve, reject) => {
        let listData = userData.usersData.map(selectedList);
        resolve(listData);
    }).then(listData => {
        response = {
            success: true,
            data: listData
        }
        res.send(response);
    }).catch(er => {
        response = {
            success: false,
            message: er.message || "Something went wrong"
        }
        res.send(response);
    })
}

const getUserDetail = (req, res) => {
    let { id } = req.body;
    let response = {};
    new Promise((resolve, reject) => {
        let userDatailData = userData.usersData.find(user => user.id == id) || {};
        if (Object.keys(userDatailData).length > 0) {
            let { availablePoints, expirePoint } = calulatePoint(userDatailData.transaction || []);
            userDatailData.availablePoints = availablePoints;
            userDatailData.expirePoint = expirePoint
        }
        resolve(userDatailData);
    }).then(userDatailData => {
        response = {
            success: true,
            data: userDatailData
        }
        res.send(response);
    }).catch(er => {
        response = {
            success: false,
            message: er.message || "Something went wrong"
        }
        res.send(response);
    })

}

module.exports = {
    getUsers,
    getUserDetail
}