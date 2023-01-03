import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppDispatch } from '../../../redux/hooks';
import { FlexContainer } from '../../common';
import { getNavItems } from './helpers';
import { TNavItem } from './types';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const checkIfActive = (item: TNavItem, router: NextRouter) => {
    return router.pathname.includes(item.link ?? 'undefined');
  };

  return (
    <HeaderWrapper>
      <FlexContainer
        style={{ justifyContent: 'space-between', maxWidth: '100%' }}
      >
        <InfoSection>
          <Link href={'/'}>
            <Logo>
              ОП
              <LogoRed>ТУРКО</LogoRed>
            </Logo>
          </Link>
          <ExchangerInfo>Administrator</ExchangerInfo>
        </InfoSection>
        <Navigation>
          {getNavItems(dispatch, router).map((item, index) => (
            <NavItem key={`nav-item-${index}`}>
              {!item.handler && (
                <NavItemLink
                  href={item.link ?? ''}
                  active={checkIfActive(item, router)}
                >
                  {item.title}
                </NavItemLink>
              )}
              {item.handler && (
                <NavItemA
                  onClick={item.handler}
                  active={checkIfActive(item, router)}
                >
                  {item.title}
                </NavItemA>
              )}
            </NavItem>
          ))}
        </Navigation>
      </FlexContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  padding: 9.5px 0;
  background: #fff;
  box-shadow: 0px 1px 16px rgba(40, 51, 68, 0.15);
  z-index: 100;
`;

const Logo = styled.div`
  font-size: 26px;
  font-weight: bold;
`;

const LogoRed = styled.span`
  color: red;
`;

const InfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 21px;
`;

const ExchangerInfo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;

const Navigation = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0;
`;

const NavItem = styled.li`
  font-size: 14px;
  cursor: pointer;
`;

const NavItemLink = styled(Link)<{ active: boolean }>`
  color: ${({ active }) => (active ? '#e62323' : '#000')};
`;

const NavItemA = styled.a<{ active: boolean }>`
  color: ${({ active }) => (active ? '#e62323' : '#000')};
`;

export default Header;
