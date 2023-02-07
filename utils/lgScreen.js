export default function () {
    if (typeof window !== 'undefined')
        return window.screen.width >= 768;
    return false
}