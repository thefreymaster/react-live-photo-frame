export const useIsDay = () => {
    if (new Date().getHours() >= 6 && new Date().getHours() <= 17) {
        return true
    }
    return false;
}