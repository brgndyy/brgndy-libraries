import { render } from '@testing-library/react';
import ScrollPreventer from './ScrollPreventer';

describe('ScrollPreventer 컴포넌트에 대한 테스트 코드 작성', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    document.body.style.height = '';
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    window.scrollTo(0, 0);
  });

  const createLongContent = () => (
    <div>
      <div style={{ height: '200rem' }}>Very long content</div>
    </div>
  );

  it('만약 isOpen Prop의 상태값이 true라면 body의 overflow와 height에 스타일이 적용된다.', () => {
    render(<ScrollPreventer isOpen={true}> {createLongContent()}</ScrollPreventer>);

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.height).toBe('100%');
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.documentElement.style.height).toBe('100%');
  });

  it('isOpen이 false가 되면 body의 스타일은 초기화 된다.', () => {
    render(<ScrollPreventer isOpen={false}> {createLongContent()}</ScrollPreventer>);

    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.height).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
    expect(document.documentElement.style.height).toBe('');
  });

  it('컴포넌트가 언마운트 되면 body 스타일이 초기화 된다.', () => {
    const { unmount } = render(
      <ScrollPreventer isOpen={true}> {createLongContent()}</ScrollPreventer>,
    );

    expect(document.body.style.overflow).toBe('hidden');
    expect(document.body.style.height).toBe('100%');
    expect(document.documentElement.style.overflow).toBe('hidden');
    expect(document.documentElement.style.height).toBe('100%');

    unmount();
    expect(document.body.style.overflow).toBe('');
    expect(document.body.style.height).toBe('');
    expect(document.documentElement.style.overflow).toBe('');
    expect(document.documentElement.style.height).toBe('');
  });

  it('해당 컴포넌트로 감싼 컨텐츠는 스크롤이 적용되지 않는다.', () => {
    render(<ScrollPreventer> {createLongContent()}</ScrollPreventer>);

    window.scrollTo(0, 100);
    expect(window.scrollY).toBe(0);
  });
});
