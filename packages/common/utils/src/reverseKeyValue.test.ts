import { reverseKeyValue } from './reverseKeyValue';

describe('reverseKeyValue 유틸 함수에 대한 테스트 코드 작성', () => {
  it('객체의 key, value 값을 서로 뒤바꾸어서 반환해야한다.', () => {
    const obj = { a: 1, b: '2' };

    const expectedObj = { 1: 'a', '2': 'b' };

    const result = reverseKeyValue(obj);

    expect(result).toEqual(expectedObj);
  });
});
