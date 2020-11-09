export function timeAgo(time) {
    const now = getTimestamp()
        // get timestamp millisecond
    const between = (now - Number(time)) / 1000 // second
    if (between < 60) {
        return pluralize(0, 'vừa xong')
    } else if (between < 3600) {
        return pluralize(~~(between / 60), ' phút')
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' giờ')
    } else if (between < 2592000) {
        return pluralize(~~(between / 86400), ' ngày')
    } else if (between < 31104000) {
        return pluralize(~~(between / 2592000), ' tháng')
    } else {
        return pluralize(~~(between / 31104000), ' năm')
    }
}

export function getTimestamp(time) {
    const date = time ? new Date(time) : new Date()
    return date.getTime()
}


function pluralize(time, label) {
    if (time === 0) {
        return label
    }
    if (time === 1) {
        return time + label + ' trước'
    }
    return time + label + ' trước'
}

export function getRandomArrayElement(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random())

    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, n)
}

export const isEmptyStr = str => (!str || 0 === str.length);

export const isBlank = str => (!str || /^\s*$/.test(str));
export const ConverToSlug = (str) => {
    if (str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();
        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');
        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');
        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }
}

export const CountString = (str) => {
    var text2 = str.replace(/\s+/g, ` `);
    var text3 = text2.split(` `);
    var numberOfWords = (text3.length) - 1;
    return numberOfWords + ' từ';
}
export const LimitText = (str, maxLength = 43, ellipsis = "... ") => {
    var finalText = ``;
    var text2 = str.replace(/\s+/g, ` `);
    var text3 = text2.split(` `);
    var numberOfWords = text3.length;
    var i = 0;
    if (numberOfWords > maxLength) {
        for (i = 0; i < maxLength; i++)
            finalText = finalText + ` ` + text3[i] + ` `;
        let end = ellipsis + finalText.slice(-(maxLength - ellipsis.length));
        return finalText + end + ".";
    } else {
        return str;
    }
}