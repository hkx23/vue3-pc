/* utils */
export const uint8ArrayToHex = (arr: Uint8Array): string => {
  return Array.prototype.map.call(arr.slice().reverse(), (x) => '00'.concat(x.toString(16)).slice(-2)).join('');
};
export const uint8ArrayToInt = (arr: Uint8Array): number => {
  return (arr[0] & 0xff) | ((arr[1] << 8) & 0xff00) | ((arr[2] << 24) >>> 8) | (arr[3] << 24);
  // return Buffer.from(arr.slice().reverse()).readIntBE(0, arr.length);
};
export const uint8ArrayToShort = (arr: Uint8Array): number => {
  // return Buffer.from(arr.slice().reverse()).readIntBE(0, arr.length);
  const s0: number = arr[0] & 0xff;
  let s1: number = arr[1] & 0xff;
  s1 <<= 8;
  return s0 | s1;
};
export const uint8ArrayToStr = (array: Uint8Array, utf8: boolean = false): string => {
  return new TextDecoder(utf8 ? 'utf-8' : 'utf-16').decode(array);
};
export const utf8ArrayToStr = (array: Uint8Array): string => {
  let out;
  let i;
  let c;
  let char2;
  let char3;

  out = '';
  const len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
        // trim 0
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0));
        break;
      default:
    }
  }

  return out;
};
export const decodeUTF16LE = (binaryStr) => {
  const cp: number[] = [];
  for (let i = 0; i < binaryStr.length; i += 2) {
    cp.push(binaryStr.charCodeAt(i) | (binaryStr.charCodeAt(i + 1) << 8));
  }
  return String.fromCharCode(...cp);
};
