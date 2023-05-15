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
      cursor: default;
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
      &_inactive {
        opacity: .35;
        pointer-events: none;
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
  text-transform: capitalize;
`;

export const SubtitleBlock = styled.h2`
  font-size: 20px;
  line-height: 26px;
  margin: 0 0 25px;
  text-transform: capitalize;
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

export const Controls = styled.div`
  position: absolute;
  top: 7px;
  right: 7px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  transition: .1s all;
  cursor: default;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background-color: ${props => props.theme.highlights + '4d'};
    border-radius: 50%;
    cursor: pointer;
    transition: .1s all;
    > img {
      max-width: 16px;
      max-height: 16px;
    }
  }
  > div + div {
    margin-left: 7px;
  }
`;

export const WorkflowBlock = styled.section`
  margin: 0;
  padding: 30px 0;
  .wf-item {
    position: relative;
    padding: 15px 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '80'};
      transition: .2s all;
      .controls {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
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
    .controls {
      clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
      &__edit,
      &__delete {
        &_hidden {
          display: none;
        }
      }
      &__edit > img {
        max-width: 12px !important;
        max-height: 12px !important;
      }
    }
  }
`;

export const CoursesBlock = styled.section`
  margin: 0;
  padding: 30px 0;
  .course {
    margin-top: 15px;
    padding: 10px 10px 10px 20px;
    border-left: 4px solid transparent;
    cursor: pointer;
    &:hover {
      border-left-color: ${props => props.theme.highlights};
      background-color: ${props => props.theme.highlights + '1a'};
      transition: .2s all;
    }
    + .course__no-items {
      display: none;
    }
    &s__wrapper {
      padding-top: 10px;
    }
    &__name {
      font-size: 25px;
      line-height: 32px;
      font-weight: 600;
    }
    &__no-items {
      margin-top: 10px;
      text-align: center;
    }
  }
`;

export const AssignmentBlock = styled.section`
  padding: 30px 0;
  border-bottom: 1px solid ${props => props.theme.highlights};
`;

export const AssignmentAnswerBlock = styled.section`
  padding: 30px 0 40px;
  .assignment-answer {
    &__form {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    &__group {
      display: flex;
      flex-direction: column;
      &_submit {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
      }
      + .assignment-answer__group {
        margin-top: 20px;
      }
    }
    &__label,
    &__title {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      margin-bottom: 10px;
      cursor: pointer;
      &_file {
        display: flex;
        flex-direction: column;
        img {
          width: 40px;
          margin-right: 10px;
        }
      }
    }
    &__title {
      margin-bottom: 0;
      line-height: 20px;
      margin-right: 15px;
      padding-right: 15px;
      border-right: 1px solid ${props => props.theme.highlights};
    }
    &__subblock{
      display: flex;
      align-items: center;
      margin-top: 10px;
      font-size: 14px;
      line-height: 17px;
    }
    &__input {
      width: 100%;
      padding: 10px 5px;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: ${props => props.theme.secondary};
      background-color: ${props => props.theme.main};
      border-radius: 8px 8px 4px 4px;
      border-color: transparent;
      border-bottom-width: 1px;
      border-bottom-color: ${props => props.theme.secondary};
      outline: none;
      white-space: pre-wrap;
      transition: .05s all;
      &_comment {
        min-height: 80px;
        overflow: auto;
        resize: none;
      }
      &_file {
        display: none;
      }
      &:focus {
        background-color: ${props => props.theme.highlights + "1a"};
        border-bottom-color: ${props => props.theme.highlights};
        transition: .05s all;
      }
    }
    &__submit {
      width: fit-content;
      padding: 7px 20px;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: ${props => props.theme.secondary};
      background-color: ${props => props.theme.highlights + "1a"};
      text-align: center;
      border-radius: 5px;
      transition: .1s all;
      cursor: pointer;
      &_inactive {
        background-color: transparent;
        opacity: .5;
        transition: .1s all;
        pointer-events: none;
      }
      &:hover {
        color: ${props => props.theme.main};
        background-color: ${props => props.theme.highlights + "99"};
        transition: .1s all;
      }
    }
    &__submitted {
      position: relative;
      &:hover {
        .controls {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
      }
      > * + :not(.controls) {
        margin-top: 8px;
      }
      .controls {
        clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
      }
    }
    &__head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-right: 44px;
    }
    &__link {
      color: ${props => props.theme.secondary};
    }
  }
`;

export const StudentsAnswersBlock = styled.section`
  padding: 30px 0 40px;
  .answer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 5px 1px ${props => props.theme.highlights + '80'};
      transition: .2s all;
      .controls {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }
    + .answer {
      margin-top: 5px;
    }
    &__section {
      &_info {
        width: 60%;
      }
      &_labels {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 5px;
        width: 30%;
      }
      &_grade {
        width: fit-content;
        padding-left: 15px;
      }
    }
    &__block {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &__title,
    &__student-info {
      font-size: 16px;
      line-height: 20px;
      font-weight: 500;
      margin-right: 15px;
      padding-right: 15px;
    }
    &__title {
      border-right: 1px solid ${props => props.theme.highlights};
    }
    &__student-info {
      margin-bottom: 8px;
      font-weight: 700;
    }
    &__link {
      color: ${props => props.theme.secondary};
    }
    &__comment {
      margin-top: 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &__label {
      width: fit-content;
      padding: 3px 5px;
      color: ${props => props.theme.secondary};
      background-color: ${props => props.theme.highlights + "1a"};
      border-radius: 5px;
      transition: .1s all;
    }
  }
`;

export const LoginBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .login {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 40vw;
    min-width: 300px;
    max-width: 450px;
    padding: 30px 25px;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px #00000080;
    &__form {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: center;
      width: 100%;
    }
    &__password {
      margin-top: 15px;
    }
    &__submit,
    &__registration {
      width: fit-content;
      margin: 0 auto;
      padding: 5px 15px;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      color: #353535;
      background-color: #0000001a;
      text-align: center;
      border-radius: 5px;
      transition: .1s all;
      cursor: pointer;
      &_inactive {
        background-color: transparent;
        opacity: .5;
        transition: .1s all;
        pointer-events: none;
      }
      &:hover {
        color: #ffffff;
        background-color: #00000099;
        transition: .1s all;
      }
    }
    &__submit {
      margin: 20px auto 0;
    }
    &__or {
      position: relative;
      margin: 15px 0 25px;
      ::before,
      ::after {
        content: '';
        position: absolute;
        top: 60%;
        display: block;
        width: 50px;
        height: 1px;
        background-color: #353535;
      }
      ::before {
        right: calc(100% + 13px);
      }
      ::after {
        left: calc(100% + 13px);
      }
    }
    input {
      width: 100%;
      padding: 10px 5px;
      font-weight: 400;
      font-size: 18px;
      line-height: 23px;
      color: #353535;
      background-color: #ffffff;
      border-radius: 8px 8px 4px 4px;
      border-color: transparent;
      border-bottom-color: #353535;
      outline: none;
      white-space: pre-wrap;
      transition: .05s all;
      &:focus {
        background-color: #0000001a;
        border-bottom-color: #000000;
        transition: .05s all;
      }
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
