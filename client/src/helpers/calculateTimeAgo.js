const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);

    const timeDifference = now - postDate;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        return Math.floor(timeDifference / 1000) + ' saniye önce';
    } else if (timeDifference < hour) {
        return Math.floor(timeDifference / minute) + ' dakika önce'
    } else if (timeDifference < day) {
        return Math.floor(timeDifference / hour) + ' saat önce'
    } else if (timeDifference < week) {
        return Math.floor(timeDifference / day) + ' gün önce'
    } else if (timeDifference < month) {
        return Math.floor(timeDifference / week) + ' hafta önce'
    } else if (timeDifference < year) {
        return Math.floor(timeDifference / month) + ' ay önce'
    } else {
        return Math.floor(timeDifference / year) + ' yıl önce'
    }
}

export default calculateTimeAgo;