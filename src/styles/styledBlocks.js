import styled from "vue3-styled-components";

export const Body = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "NotoSans", Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.main};
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100vw;
  padding: 60px 50px 0 110px;
  transition: .3s all;
  &.container_s {
    padding-left: 260px;
    transition: .3s all;
  }
`;

export const ContainerHeader = Container.extend`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const HeaderBlock = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 18px 0;
  background-color: ${props => props.theme.main + 'f2'};
  box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '33'};
  z-index: 10;
  .header {
    &__left-part,
    &__right-part {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      & > * {
        cursor: pointer;
      }
      & > * + * {
        margin-left: 30px;
      }
    }
    &__logo {
      font-size: 30px;
      line-height: 23px;
      font-weight: 800;
      color: ${props => props.theme.highlights};
    }
    &__customize {
      position: relative;
      &:hover {
        .header__customize-img {
          transform: translateX(-24px) rotate(-90deg);
          transition: .2s all;
        }
        .header__dropdown {
          display: block;
        }
      }
      &-img{
        position: relative;
        transition: .2s all;
        z-index: 20;
      }
    }
    &__dropdown {
      position: absolute;
      top: -5px;
      right: -15px;
      padding: 37px 5px 10px;
      background-color: ${props => props.theme.main + 'f2'};
      box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '33'};
      text-align: center;
      display: none;
      cursor: default;
      z-index: 15;
      &-item {
        transition: .2s all;
        &_active {
          background-color: ${props => props.theme.highlights + '33'};
          transition: .2s all;
        }
        &:hover {
          background-color: ${props => props.theme.highlights + '1a'};
          transition: .2s all;
        }
      }
      & > * {
        border-radius: 5px;
        padding: 5px;
        cursor: pointer;
      }
      & > * + * {
        //border-top: 1px solid ${props => props.theme.highlights + 'd9'};
      }
    }
  }
  img {
    height: 24px;
  }
`;

export const BurgerBlock = styled.div`
  .burger {
    position: relative;
    width: 20px;
    height: 20px;
    &::before,
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 3px;
      position: absolute;
      left: 0;
      background-color: ${props => props.theme.highlights};
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
    &__bullet {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      height: 4px;
      width: 4px;
      background-color: ${props => props.theme.highlights};
      border-radius: 50%;
      transition: .3s all;
    }
    &_off {
      .burger__bullet {
        left: calc( 100% - 4px );
        transition: .3s all;
      }
    }
  }
`;

export const SidebarBlock = styled.div`
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 210px;
    height: calc(100vh - 60px);
    padding: 40px 11px 30px 11px;
    background-color: inherit;
    z-index: 1;
    box-shadow: 0 5px 5px 1px ${props => props.theme.highlights + '33'};
    overflow: hidden;
    transition: .3s all;
    &_s {
      width: 60px;
      transition: .3s all;
    }
    &__item {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      padding: 8px 7px;
      border-radius: 15px;
      transition: .2s all;
      cursor: pointer;
      &_active {
        background-color: ${props => props.theme.highlights + '33'};
        transition: .2s all;
      }
      &:hover {
        background-color: ${props => props.theme.highlights + '1a'};
        transition: .2s all;
      }
      & + .sidebar__item {
        margin-top: 30px;
      }
    }
    &__icon {
      width: 24px;
      margin-right: 20px;
    }
    &__label {
      min-width: 130px;
      font-size: 20px;
      font-weight: 600;
      color: ${props => props.theme.highlights}
    }
    &__separator {
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.highlights};
      margin: 20px 0;
    }
  }
`;

export const TitleBlock = styled.h1`
  font-size: 35px;
  line-height: 45px;
  margin: 8px 0 30px;
`;

export const SearchBlock = styled.input`
  position: relative;
  display: block;
  min-width: 50vw;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.secondary};
  background-color: ${props => props.theme.main};
  margin: 40px auto 0;
  padding: 10px;
  text-align: center;
  outline: none;
  border: 2px solid ${props => props.theme.highlights + 'd9'};
  border-radius: 20px;
  .search__clear {
    position: absolute;
  }
`;

export const NewNoteBlock = styled.div`
  position: absolute;
  top: 103px;
  right: 50px;
  width: 40px;
  height: 40px;
  background-color: inherit;
  border-radius: 50%;
  transition: .15s all;
  cursor: pointer;
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 27px;
    height: 3px;
    background-color: ${props => props.theme.highlights};
  }
  &::before{
    transform: translate(-50%, -50%);
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
  &:hover {
    box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '80'};
    transform: rotate(90deg);
    transition: .15s all;
  }
`;

export const WorkflowBlock = styled.section`
  margin: 0;
  padding: 30px 0;
  overflow: visible;
  .wf-item {
    padding: 15px 10px;
    /* cursor: pointer; */
    &:hover {
      box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '80'};
      transition: .2s all;
    }
    &__group {
      padding-bottom: 10px;
      + .wf-item__group {
        padding-top: 10px;
        border-top: 2px solid ${props => props.theme.highlights};
      }
      + .wf-item__no-items {
        display: none;
      }
    }
    &__wrapper {
      padding: 10px 0;
      + .wf-item__wrapper {
        border-top: 1px dashed ${props => props.theme.secondary};
      }
    }
    &__name {
      font-size: 20px;
      line-height: 26px;
      font-weight: 600;
    }
    &__descr {
      display: -webkit-box;
      max-height: 35px;
      margin-top: 10px;
      overflow: hidden;
      white-space: pre-wrap;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
`;

export const OverlayBlock = styled.section`
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .7);
    z-index: 20;
    visibility: visible;
    &_hidden {
      visibility: hidden;
    }
    &__form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40vw;
      height: 40vh;
      background-color: ${props => props.theme.main};
      margin: 0 auto;
      border: 1px solid ${props => props.theme.highlights + 'd9'};
      border-radius: 8px;
      padding: 30px 20px 15px;
    }
    &__note {
      &-title {
        width: 100%;
        font-weight: 600;
        font-size: 20px;
        padding: 10px 5px;
      }
      &-content {
        width: 100%;
        height: calc(40vh - 144px);
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
        margin-top: 15px;
        padding: 10px 5px;
        resize: none;
        &::-webkit-scrollbar{
          display: none;
        }
      }
    }
    &__submit{
      display: block;
      width: 200px;
      margin: 10px auto 0;
      padding: 5px 15px;
      color: ${props => props.theme.secondary};
      text-align: center;
      border-radius: 5px;
      transition: .05s all;
      cursor: pointer;
      &:hover {
        color: ${props => props.theme.highlights};
        transition: .05s all;
      }
    }
  }
  input,
  textarea {
    color: ${props => props.theme.secondary};
    background-color: ${props => props.theme.main};
    border-radius: 8px;
    border: none;
    outline: none;
    white-space: pre-wrap;
    transition: .05s all;
    &:focus {
      background-color: ${props => props.theme.highlights + '1a'};
      transition: .05s all;
    }
  }
`;

export const AlertBlock = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 150px;
  padding: 10px 20px;
  border-radius: 8px;
  color: inherit;
  background-color: inherit;
  box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '33'};
  text-align: center;
  transition: .1s all;
  z-index: 30;
  &.alert_hidden {
    bottom: -50px;
    transition: .1s all;
  }
`;
