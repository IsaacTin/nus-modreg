export default (lessonType) => {
    switch (lessonType) {
        case 'Tutorial':
            return 'TUT';
        case 'Laboratory':
            return 'LAB';
        case 'Lecture':
            return 'LEC';
        case 'Sectional Teaching':
            return 'SEC';
        case 'Recitation':
            return 'REC';
        case 'Seminar-Style Module Class':
            return 'SEM';
        default:
            return '';
    }
};
