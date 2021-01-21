export const base64ToBlob = (dataURI: string): Blob | null => {
    if (!(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(dataURI))) return null;

    dataURI = dataURI.replace(/^data:/, '');

    const type: string = dataURI.match(/image\/[^;]+/).join(',');
    const base64 = dataURI.replace(/^[^,]+,/, '');
    const arrayBuffer = new ArrayBuffer(base64.length);
    const typedArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64.length; i++) {
        typedArray[i] = base64.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type });
};
