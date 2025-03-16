![ssenbi_banner_2안 (1) (1).gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/2bdacfc4-1053-4ee1-a39b-62244cca102a/ff872edb-2467-4cdd-99e7-5cd1fcc2ccc4/ssenbi_banner_2%EC%95%88_(1)_(1).gif)

# 💡 Topic

- **자영업자를 위한 문자 CRM 서비스**
- 고객을 그룹으로 묶어 관리하고 그룹 메시지 전송이 가능한 서비스
- 삼성청년 소프트웨어 아카데미 11기 프로젝트


# 📝 Summary

소규모 자영업자를 위한 **모바일에서도 활용 가능한 문자 CRM 서비스** 입니다. 고객과 메시지 템플릿을 그룹으로 관리할 수 있으며, 등록된 그룹을 통해 한 번에 메시지를 전송할 수 있습니다. 또한, 챗봇을 활용하여 메시지를 빠르게 작성할 수 있어, 보다 효율적인 고객 커뮤니케이션이 가능합니다.


# ⭐️ Key Function

- **커스텀 템플릿 관리**
    - 예시 메시지 템플릿을 제공하며, 이를 간편하게 복사하여 사용할 수 있음
    - 챗봇을 활용한 템플릿 자동 작성 기능 제공
    - 템플릿에 그룹과 고객을 등록하여, **템플릿을 통한 문자 전송 시 등록된 그룹과 고객을 자동으로 활용**
- **고객 관리**
    - 고객을 그룹으로 관리하여, **그룹을 선택해 한 번에 메시지를 전송**할 수 있음
    - 엑셀 파일을 활용한 고객 대량 등록 기능 제공
- **메시지 전송**
    - 메시지 작성 및 수정 시 **AI 챗봇을 활용한 자동 작성 기능 제공**
    - 예약어 기능을 사용하여 **개인 맞춤형 메시지 전송 가능**
    - **개인 또는 그룹 단위로 메시지 전송 가능**


# 🛠 Tech Stack

FrontEnd : `TypeScript` , `React` , `React-Native` , `Next.JS`

BackEnd : `Java` | `SpringBoot` | `JPA`
DataBase : `MySQL`

Infra : `EC2` | `Nginx` | `AWS S3` | `Docker` | `Jenkins`

Other : `CoolSMS`, `OpenAI`


# ⚙️ Architecture

**`Spring MVC`**


# 🧑🏻‍💻 Team

- 프론트 개발자 3명
- 백엔드 개발자 3명


# 🤚🏻 Part

**메시지 전송 기능 구현**

> CoolSMS API를 활용한 메시지 발송 시스템 구축
> 
> - **`DefaultMessageService`**를 사용하여 **`CoolSMS API`** 메시지 전송 로직 구현
> - Coolsms API를 활용해 문자 전송 시스템을 구축하는 과정에서, **다량의 메시지를 동시에 전송할 때 응답 시간이 선형적으로 증가하는 문제 발생**
> - **단일 요청당 응답 시간이 약 1000ms였기 때문에 100명에게 메시지를 보내면 사용자는 약 100초**를 기다려야 했습니다.
> - 단체 메시지 전송시 **`@Async`** 어노테이션을 사용하여 비동기 처리하여 응답속도를 1/16으로 개선했습니다.

**커스텀 메시지, 그룹, 고객 REST API 개발**

> 고객, 그룹, 커스텀 메시지의 CRUD 및 REST API 개발
> 
> - **`JPA`**를 활용하여 고객, 그룹, 사용자 간의 관계를 정의하는 엔터티 설계 및 구현
> - 두 개 이상의 **`OneToMany`** 관계를 가지는 엔티티 조회 시 **`batch size`**를 활용하여 N+1 문제 해결

**OpenAI API 기반 메시지 자동 생성 기능**

> OpenAI API 및 프롬프트 엔지니어링을 활용한 메시지 자동 생성 및 템플릿 추천 기능 개발
> 
> - **`WebClient`**를 사용하여 **`OpenAI API`**와 요청, 프롬프트 최적화를 통한 메시지 품질 개선

**무중단 배포 구현(Refactoring)**

> EC2, Docker, Nginx, GitHub Action을 사용하여 blue/green 무중단 배포
> 
> - GitHub Action을 **빌드 및 배포 파이프 라인 구축**

# 🤔 Learned

- 두 개 이상의 **`OneToMany`** 관계를 가지는 엔티티 조회 시, **fetch join을 사용했을 때 발생하는 문제점**을 경험했으며, 이를 EntityGraph와 Batchsize를 사용하여 해결 할 수 있다는 것을 알게 됐습니다.
- EC2, Docker, Nginx, GitHub Actions를 활용하여 **Blue/Green 배포 방식을 적용하면서 무중단 배포의 원리를 이해**하게 되었습니다.
- **`@Async`**를 활용한 단체 메시지 전송을 구현하면서, **비동기 처리를 통해 성능을 향상**시키는 방법을 익혔습니다.
- **협업 툴인 `JIRA`를** 사용해보았고 **애자일 방법론**을 도입하여 프로젝트를 진행할 수 있었습니다.
