# Webster-Embeddeds-Team-Project
### 협업방법
1. develop branch에서 새로운 브랜치를 생성해서 작업.
2. commit을 완료하면 develop branch에 PR 날리기.
    - **master branch에 commit하거나 PR을 날리는 일은 없어야 합니다.**
3. 충돌하는 부분이 없는지 확인하고 develop branch에 merge하기.

- master branch : 릴리스 이력을 관리하기 위해 사용. 즉, 배포가능한 상태만을 관리한다.
- develop branch : 기능 개발을 위한 브랜치들을 병합하기 위해 사용. (모든 기능이 추가되고 버그가 수정되어 배고 가능한 상태라면 'master' branch에 merge 한다.) 평소에는 이 브랜치를 기반으로 개발을 진행한다.