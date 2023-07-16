const SITE_NAME = 'Bank app - Vanilla JS';

export const getTitle = (title) => {
    return title ? `${title} | ${SITE_NAME}` : SITE_NAME;
}
