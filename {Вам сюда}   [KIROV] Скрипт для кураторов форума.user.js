// ==UserScript==
// @name          Black Russia | Скрипт для КФ
// @namespace     https://forum.blackrussia.online
// @version       1.121
// @description   Скрипт для Кураторов Форума.
// @author        POZAIMSTVOVAL
// @match         https://forum.blackrussia.online/threads/*
// @include       https://forum.blackrussia.online/threads/
// @icon          https://icons.iconarchive.com/icons/google/noto-emoji-food-drink/256/32343-watermelon-icon.png
// @grant         none
// @license       none
// ==/UserScript==

(function () {
    'use strict';
    'esversion 6' ;
    const UNACCEPT_PREFIX = 4; // Префикс "Отказано"
    const ACCEPT_PREFIX = 8; //  Префикс "Одобрено"
    const PIN_PREFIX = 2;  //  Префикс "На рассмотрении"
    const WATCHED_PREFIX = 9; // Префикс "Рассмотрено"
    const CLOSE_PREFIX = 7; // Префикс "Закрыто"
    const TEX_PREFIX = 13; // Префикс "Техническому специалисту"
    const GA_PREFIX = 12; // Префикс "Главному Администратору"
    const V_PREFIX = 1;
    const NULL_PREFIX = 15;
    const buttons = [
        {
            title: '-----------------------------------------------------------------------Жалобы на игроков---------------------------------------------------------------',
        },
        {
            title: '-----------------------------------------------------------------------Одобрения-----------------------------------------------------------------------',
        },
        {
            title: 'DM',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.19.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещен DM (DeathMatch) — убийство или нанесение урона без веской IC причины[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Jail 60 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            "[LIST]<br><br>" +
            "[*][LEFT][FONT=book antiqua][COLOR=rgb(255, 0, 0)][SIZE=4]Примечание: [/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4]разрешен ответный DM в целях защиты, обязательно иметь видео доказательство в случае наказания администрации, нанесение урона по транспорту также является нарушением данного пункта правил.[/SIZE][/COLOR][/FONT][/LEFT]<br><br>" +
            "[*][LEFT][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]нанесение урона с целью защиты особняка или его территории, а также нанесение урона после ДТП не является веской IC причиной, для войны семей предусмотрено отдельное системное мероприятие.[/SIZE][/FONT][/COLOR][/LEFT]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'MG',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.18. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещен MG (MetaGaming) — использование ООС информации, которую Ваш персонаж никак не мог получить в IC процессе[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Mute 30 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]использование смайлов в виде символов «))», «=D» запрещено в IC чате.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание:[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] телефонное общение также является IC чатом.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание:[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] за написанный однократно вопросительный «?» или восклицательный «!» знак в IC чате, наказание не выдается.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Эдит в лич. целях',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.18. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено редактировать поданные объявления в личных целях заменяя текст объявления на несоответствующий отправленному игроком [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Ban 7 дней + ЧС организации[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'ТК',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]2.15.[/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещен TK (Team Kill) — убийство члена своей или союзной фракции, организации без наличия какой-либо IC причины[/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua] | Jail 60 минут / Warn (за два и более убийства)[/FONT][/SIZE][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'SК',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]2.16. [/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещен SK (Spawn Kill) — убийство или нанесение урона на титульной территории любой фракции / организации, на месте появления игрока, а также на выходе из закрытых интерьеров и около них[/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua] | Jail 60 минут / Warn (за два и более убийства) [/FONT][/SIZE][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Рынок в ГОСС',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]3.22. [/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещено публиковать любые объявления в помещениях государственных организаций вне зависимости от чата (IC или OOC) [/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]| Mute 30 минут[/FONT][/SIZE][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]Пример: [/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua]в помещении центральной больницы писать в чат: «Продам эксклюзивную шапку дешево!!!»[/FONT][/SIZE][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'CAPS',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.02. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено использование верхнего регистра (CapsLock) при написании любого текста в любом чате[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Mute 30 минут [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title:
            'DB',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua]2.13. [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua] Запрещен DB (DriveBy) — намеренное убийство / нанесение урона без веской IC причины на любом виде транспорта [/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua]| Jail 60 минут[/FONT][/COLOR]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Исключение:[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] разрешается на территории проведения мероприятия по захвату упавшего семейного контейнера.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP обман',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]2.05.[/COLOR][COLOR=rgb(209, 213, 216)] Запрещены любые OOC обманы и их попытки, а также любые IC обманы с нарушением Role Play правил и логики[/COLOR][COLOR=rgb(255, 0, 0)] | PermBan[/COLOR][/SIZE][/FONT]<br><br>" +
            '[LIST]<br><br>' +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Примечание: [/COLOR][COLOR=rgb(209, 213, 216)]после IC договоренности получить денежные средства и сразу же выйти из игры с целью обмана игрока, или же, договорившись через OOC чат (/n), точно также получить денежные средства и сразу же выйти из игры и тому подобные ситуации.[/COLOR][/SIZE][/FONT]<br><br>" +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Примечание: [/COLOR][COLOR=rgb(209, 213, 216)]разблокировка игрового аккаунта нарушителя будет возможна только в случае возврата полной суммы причиненного ущерба, либо непосредственно самого имущества, которое было украдено (по решению обманутой стороны).[/COLOR][/SIZE][/FONT]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP поведение',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]2.01. [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua] Запрещено поведение, нарушающее нормы процессов Role Play режима игры[/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua] | Jail 30 минут[/FONT][/COLOR][/SIZE]<br><br>" +
            '[LIST]<br><br>' +
            "[*][SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]Примечание: [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua]ездить на крышах транспортных средств, бегать или ходить по столам в казино, целенаправленная провокация сотрудников правоохранительных органов с целью развлечения, целенаправленная помеха в проведении различных собеседований и так далее.[/FONT][/COLOR][/SIZE]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP Поведение копа',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]6.03. [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua] Запрещено nRP поведение[/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua] | Warn[/FONT][/COLOR][/SIZE]<br><br>" +
            '[LIST]<br><br>' +
            "[*][SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]Примечание: [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua]поведение, не соответствующее сотруднику УМВД.[/FONT][/COLOR][/SIZE]<br><br>" +
            "[*][SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]Пример: [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua]открытие огня по игрокам без причины,расстрел машин без причины, нарушение ПДД без причины,сотрудник на служебном транспорте кричит о наборе в свою семью на спавне.[/FONT][/COLOR][/SIZE]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Уход от RP',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]2.02. [/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещено целенаправленно уходить от Role Play процесса всеразличными способами [/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]| Jail 30 минут / Warn[/FONT][/SIZE][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]Примечание: [/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua]уходить в AFK при остановке транспортного средства правоохранительными органами, выходить из игры для избежания смерти, выходить из игры во время процесса задержания или ареста, полное игнорирование отыгровок другого игрока, которые так или иначе могут коснуться Вашего персонажа. Уходить в интерьер или зеленую зону во время перестрелки с целью избежать смерти или уйти от Role Play процесса и так далее.[/FONT][/SIZE][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP Drive',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.03. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещен NonRP Drive — вождение любого транспортного средства в невозможных для него условиях, а также вождение в неправдоподобной манере[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Jail 30 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание:[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] езда на скутере по горам, езда на любом транспортном средстве по встречным полосам, нарушая все правила дорожного движения без какой-либо причины, намеренное создание аварийных ситуаций на дорогах и так далее.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Аморал',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]2.08. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещена любая форма аморальных действий сексуального характера в сторону игроков[/COLOR][COLOR=rgb(255, 0, 0)] | Jail 30 минут / Warn[/COLOR][/FONT][/SIZE]<br><br>" +
            '[LIST]<br><br>' +
            "[*][SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]Исключение: [/COLOR][COLOR=rgb(209, 213, 216)]обоюдное согласие обеих сторон.[/COLOR][/FONT][/SIZE]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Слив склада',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]2.09.[/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещено сливать склад фракции / семьи путем взятия большого количестве ресурсов, или же брать больше, чем разрешили на самом деле[/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua] | Ban 15 - 30 дней / PermBan[/FONT][/SIZE][/COLOR]<br><br>"+
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'PG',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]2.17. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещен PG (PowerGaming) — присвоение свойств персонажу, не соответствующих реальности, отсутствие страха за свою жизнь [/COLOR][COLOR=rgb(255, 0, 0)]| Jail 30 минут[/COLOR][/FONT][/SIZE]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Mass DM',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]2.20. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещен Mass DM (Mass DeathMatch) — убийство или нанесение урона без веской IC причины трем игрокам и более[/COLOR][COLOR=rgb(255, 0, 0)] | Warn / Ban 3 - 7 дней[/COLOR] [/SIZE][/FONT]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Bagouse',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]2.21.[/COLOR][COLOR=rgb(209, 213, 216)] Запрещено пытаться обходить игровую систему или использовать любые баги сервера[/COLOR][COLOR=rgb(255, 0, 0)] | Ban 15 - 30 дней / PermBan[/COLOR][/FONT][/SIZE]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Bagouse Anim',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]2.55. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещается багоюз связанный с анимацией в любых проявлениях. [/COLOR][COLOR=rgb(255, 0, 0)]| Jail 60 / 120 минут[/COLOR][/FONT][/SIZE]<br><br>" +
            '[LIST]<br><br>' +
            "[*][SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]Пример: [/COLOR][COLOR=rgb(209, 213, 216)]если игрок, используя баг, убирает ограничение на использование оружия в зеленой зоне, сбивает темп стрельбы, либо быстро перемещается во время войны за бизнес или во время перестрелки на мероприятии с семейными контейнерами, последует наказание в виде Jail на 120 минут. Данное наказание используется в случаях, когда, используя ошибку, было получено преимущество перед другими игроками.[/COLOR][/FONT][/SIZE]<br><br>" +
            "[*][SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]Пример: [/COLOR][COLOR=rgb(209, 213, 216)]если игрок использует баги, связанные с анимацией, и при этом не влияет на игровой процесс других игроков, а также не получает преимущество перед другими игроками, последует наказание в виде Jail на 60 минут.[/COLOR][/FONT][/SIZE]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'OOC оск',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]3.03. [/COLOR][COLOR=rgb(209, 213, 216)] Любые формы оскорблений, издевательств, расизма, дискриминации, религиозной враждебности, сексизма в OOC чате запрещены[/COLOR][COLOR=rgb(255, 0, 0)] | Mute 30 минут[/COLOR] [/SIZE][/FONT]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Упом род',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]3.04. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещено оскорбление или косвенное упоминание родных вне зависимости от чата (IC или OOC) [/COLOR][COLOR=rgb(255, 0, 0)]| Mute 120 минут / Ban 7 - 15 дней[/COLOR][/SIZE][/FONT]<br><br>" +
            '[LIST]<br><br>' +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Примечание:[/COLOR][COLOR=rgb(209, 213, 216)] термин «MQ» расценивается, как упоминание родных.[/COLOR][/SIZE][/FONT]<br><br>" +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Исключение: [/COLOR][COLOR=rgb(209, 213, 216)]если упоминание родных было совершено в ходе Role Play процесса и не содержало в себе прямого или завуалированного оскорбления.[/COLOR][/SIZE][/FONT]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Оск род войс',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]3.15. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещено оскорблять игроков или родных в Voice Chat [/COLOR][COLOR=rgb(255, 0, 0)]| Mute 120 минут / Ban 7 - 15 дней[/COLOR][/SIZE][/FONT]<br><br>" +
            '[LIST]<br><br>' +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Примечание:[/COLOR][COLOR=rgb(209, 213, 216)] термин «MQ» расценивается, как упоминание родных.[/COLOR][/SIZE][/FONT]<br><br>" +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Исключение: [/COLOR][COLOR=rgb(209, 213, 216)]если упоминание родных было совершено в ходе Role Play процесса и не содержало в себе прямого или завуалированного оскорбления.[/COLOR][/SIZE][/FONT]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Flood',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.05.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещен флуд — 3 и более повторяющихся сообщений от одного и того же игрока[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Mute 30 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'IC оск (секс. хар-ра)',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.07.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещены совершенно любые оскорбления или действия, порочащие честь и достоинства, несущие в себе подтекст сексуального характера вне зависимости от чата[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Mute 30 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]«дырка», «шмара», «ведро», «мадагаскарский присосконог», «свиноногий бандикут», «скорострел» и так далее.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Слив ГЧ',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.08. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещены любые формы «слива» посредством использования глобальных чатов [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| PermBan[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Угроза о наказ',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]3.09.[/COLOR][COLOR=rgb(209, 213, 216)] Запрещены любые угрозы о наказании игрока со стороны администрации [/COLOR][COLOR=rgb(255, 0, 0)]| Mute 30 минут[/COLOR][/FONT][/SIZE]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'ooc угрозы',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][FONT=book antiqua][COLOR=rgb(255, 0, 0)]2.37.[/COLOR][COLOR=rgb(209, 213, 216)] Запрещены OOC угрозы, в том числе и завуалированные [/COLOR][COLOR=rgb(255, 0, 0)]| Mute 120 минут / Ban 7 дней [/COLOR][/FONT][/SIZE]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Выдача за адм',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.10.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещена выдача себя за администратора, если таковым не являетесь [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Ban 7 - 15 + ЧС администрации[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Введение в заблуж',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.32.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено введение в заблуждение, обман администрации на всех ресурсах проекта [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Ban 7 - 15 дней[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'польз уязв правил',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.33.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено пользоваться уязвимостью правил [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Ban 15 дней [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'уход от наказ',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.34.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещен уход от наказания[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Ban 15 - 30 дней [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'конфликты ooc и ic',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.35.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] На игровых серверах запрещено устраивать IC и OOC конфликты на почве разногласия о национальности и / или религии совершенно в любом формате[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Mute 120 минут / Ban 7 дней [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Переносить конфликты',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.36.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено переносить конфликты из IC в OOC и наоборот[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Warn [/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]все межфракционные конфликты решаются главными следящими администраторами.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status:
            false,
        },
        {
            title: 'Злоуп нарушениями',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.39.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Злоупотребление нарушениями правил сервера[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Ban 7 - 30 дней [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Продажа промо',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.43.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещена продажа / обмен / покупка поощрительной составляющей от лица проекта, будь то бонус-код, либо промокод, который выдается безвозмездно игрокам в целях промоакций[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Mute 120 минут [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Неув к адм',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.54.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено неуважительное обращение, оскорбление, неадекватное поведение, угрозы в любом их проявлении по отношению к администрации[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Mute 180 минут [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Не на русском в чате',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.01.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Общепризнанный язык сервера — русский. Общение в IC чатах во всех Role Play ситуациях обязательно должно проходить исключительно на русском языке[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Устное замечание / Mute 30 минут [/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Полит/религ пропаганда',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.18.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено политическое и религиозное пропагандирование [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Mute 120 минут / Ban 10 дней[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Транслит',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]3.20.[/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua] Запрещено использование транслита в любом из чатов[/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua] | Mute 30 минут[/FONT][/COLOR][/SIZE]<br><br>" +
            '[LIST]<br><br>' +
            "[*][SIZE=4][COLOR=rgb(255, 0, 0)][FONT=book antiqua]Пример: [/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua]«Privet», «Kak dela», «Narmalna».[/FONT][/COLOR][/SIZE]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Реклама промо',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.21.[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещается реклама промокодов в игре, а также их упоминание в любом виде во всех чатах. [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Ban 30 дней[/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]чаты семейные, строительных компаний, транспортных компаний, фракционные чаты, IC, OOC, VIP и так далее.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Исключение: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]промокоды, предоставленные разработчиками, а также распространяемые через официальные ресурсы проекта.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Пример: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]если игрок упомянет промокод, распространяемый через официальную публичную страницу ВКонтакте либо через официальный Discord в любом из чатов, наказание ему не выдается.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Сборка/Читы',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.22. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено хранить / использовать / распространять стороннее программное обеспечение или любые другие средства, позволяющие получить преимущество над другими игроками[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Ban 15 - 30 дней / PermBan[/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Примечание: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]запрещено внесение любых изменений в оригинальные файлы игры.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Исключение: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]разрешено изменение шрифта, его размера и длины чата (кол-во строк).[/SIZE][/FONT][/COLOR]<br><br>" +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Исключение: [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4]блокировка за включенный счетчик FPS не выдается.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Реклама',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]2.31. [/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещено рекламировать на серверах любые проекты, серверы, сайты, сторонние Discord-серверы, YouTube каналы и тому подобное[/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua] | Ban 7 дней / PermBan [/FONT][/SIZE][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Оск/обман адм',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]2.32. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещено введение в заблуждение, обман, оскорбление, неконструктивная критика администрации на всех ресурсах проекта [/COLOR][COLOR=rgb(255, 0, 0)]| Ban 7 - 30 дней / PermBan[/COLOR][/SIZE][/FONT]<br><br>" +
            '[LIST]<br><br>' +
            "[*][FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]Пример: [/COLOR][COLOR=rgb(209, 213, 216)]подделка доказательств, искажение информации в свою пользу, оскорбление администрации в репорт, обвинение администраторов без доказательств и т.д.[/COLOR][/SIZE][/FONT]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Оск проекта' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]Здравствуйте, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту строгих правил серверов:[/SIZE][/FONT][/COLOR] [/I]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(255, 0, 0)]2.40. [/COLOR][COLOR=rgb(209, 213, 216)] Запрещены совершенно любые деструктивные действия по отношению к проекту: неконструктивная критика, призывы покинуть проект, попытки нарушить развитие проекта или любые другие действия, способные привести к помехам в игровом процессе [/COLOR][COLOR=rgb(255, 0, 0)]| Mute 300 минут / Ban 30 дней (Ban выдается по согласованию с главным администратором)[/COLOR][/SIZE][/FONT]<br><br> " +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb( 0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman ][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]' ,
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'ЕПП',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2.46. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено ездить по полям на любом транспорте[/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4] | Jail 30 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            '[LIST]<br><br>' +
            "[*][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]Исключение:[/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] разрешено передвижение на кроссовых мотоциклах и внедорожниках.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[/LIST]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'ЕПП Фура и инкос',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][COLOR=rgb(255, 0, 0)][SIZE=4]2.47. [/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4] Запрещено ездить по полям на грузовом транспорте, инкассаторских машинах (работа дальнобойщика, инкассатора)[/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4] | Jail 60 минут[/SIZE][/COLOR][/FONT]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP Cop',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту правил государственных структур:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[FONT=book antiqua][COLOR=rgb(255, 0, 0)][SIZE=4]6.02. [/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4] Запрещено выдавать розыск без Role Play причины[/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4] | Warn[/SIZE][/COLOR][/FONT]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Прогул Р/Д',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту правил государственных структур:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua]1.13.[/FONT][/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4][FONT=book antiqua] Запрещено находиться в форме внутри казино, а также устраиваться на сторонние работы в форме фракции[/FONT][/SIZE][/COLOR][COLOR=rgb(255, 0, 0)][SIZE=4][FONT=book antiqua] | Jail 30 минут[/FONT][/SIZE][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP В/Ч',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту правил нападения на военную часть:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]2. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] За нарушение правил нападения на Военную Часть выдаётся предупреждение [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Jail 30 минут (NonRP нападение) / Warn (Для сотрудников ОПГ)[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'NRP ограб/похищение',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по общим правилам ограблений и похищений.[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Тех. спецу',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][I][FONT=times new roman][SIZE=4]Ваша жалоба переадресована [/SIZE][/FONT][/I][/COLOR][COLOR=rgb(255, 102, 0)][I][FONT=times new roman][SIZE=4]Техническому Специалисту[/SIZE][/FONT][/I][/COLOR][COLOR=rgb(209, 213, 216)][I][FONT=times new roman][SIZE=4], ожидайте ответа в данной теме.[/SIZE][/FONT]<br><br>" +
            "[FONT=times new roman][SIZE=4]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/SIZE][/FONT][/I][/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]',
            prefix: TEX_PREFIX,
            status: true,
        },
        {
            title: 'Мат в вип',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            "[COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]3.23. [/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] Запрещено использование нецензурных слов, в том числе завуалированных и литературных в VIP чате [/SIZE][/FONT][/COLOR][COLOR=rgb(255, 0, 0)][FONT=book antiqua][SIZE=4]| Mute 30 минут[/SIZE][/FONT][/COLOR]<br><br>" +
            "[I][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Приятной игры на BLACK RUSSIA [/SIZE][/FONT][/COLOR][COLOR=rgb(0, 255, 255)][FONT=times new roman][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4].[/SIZE][/FONT][/COLOR][/I]<br><br>" +
            '[COLOR=rgb(51, 204, 51)][FONT=times new roman][SIZE=4][I]Одобрено.[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: '--------------------------------------------------------------------------Отказы--------------------------------------------------------------------------',
        },
        {
            title: 'Недостаточно док-в',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]Недостаточно доказательств для корректного рассмотрения вашей жалобы.[/I][/SIZE][/FONT]<br><br>" +
            "[I][FONT=times new roman][SIZE=4]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/SIZE][/FONT][/I][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Отсутствуют док-ва',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Отсутствуют доказательства - следовательно, рассмотрению не подлежит. Загрузите доказательства на фото-видео хостинги YouTube, Imgur, Yapx и так далее.[/I][/FONT][/SIZE]<br><br>" +
            "[I][FONT=times new roman][SIZE=4]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/SIZE][/FONT][/I][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Док-ва в соц. сетях',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Доказательства в социальных сетях и т.д. не принимаются. Загрузите доказательства на фото-видео хостинги YouTube,Imgur, Yapx и так далее.[/I][/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Нарушений нет',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]Нарушений со стороны игрока не было замечено.<br><br>" +
            "Внимательно изучите общие правила серверов - [/I][URL='https://forum.blackrussia.online/index.php?threads/Общие-правила-серверов.312571/']*Нажмите сюда*[/URL]<br><br>" +
            "[I]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Нет time',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]На доказательствах отсутствуют дата и время [/I]([/SIZE][/FONT][FONT=courier new][SIZE=4]/time[/SIZE][/FONT][FONT=times new roman][SIZE=4])[I] - следовательно, рассмотрению не подлежит.<br><br>" +
            "Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][COLOR=rgb(209, 213, 216)].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Док-ва отредакт',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]Доказательства были подвергнуты редактированию - следовательно, рассмотрению не подлежит.<br><br>" +
            "Загрузите оригиналы видеозаписи/скриншотов, создав новую тему в данном разделе.<br><br>" +
            "Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Док-ва обрываются',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]Ваша видеозапись обрывается. Загрузите полную видеозапись на видео-хостинг YouTube.<br><br>" +
            "Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Некорректный текст оск мат' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]В вашей жалобе присутствует некорректный текст.[/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты этой темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br> <br>" +
            "[FONT=times new roman][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]' ,
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Нет таймкодов' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваша жалоба отказана, т.к в ней нету таймкодов. Если видео длится больше 3-ех минут - Вы должны указать таймкоды нарушений.[/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты этой темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br> <br>" +
            "[FONT=times new roman][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]' ,
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'прошло 3 дня' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE ][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваша жалоба отказана, т.к с момента нарушения прошло более 72-ух часов.[/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты этой темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br> <br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]' ,
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'от 3-его лица' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваша жалоба отказана, т.к она написана от 3-его лица.[/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты этой темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br> <br>" +
            "[FONT=times new roman][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]' ,
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'уже был ответ' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваша жалоба отказана, т.к ранее уже был дан ответ.[/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты этой темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br> <br>" +
            "[FONT=times new roman][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]' ,
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'уже был наказан' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваша жалоба отказана, т.к нарушитель уже был наказан ранее.[/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты этой темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br> <br>" +
            "[FONT=times new roman][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]' ,
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Не по форме',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваша жалоба составлена не по форме. Внимательно прочитайте правила подачи жалоб на игроков, закрепленные в этом разделе.[/I][/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Нет доступа',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Ваши доказательства не доступны к просмотру. Загрузите доказательства на фото-видео хостинги YouTube,Imgur, Yapx и так далее.[/I][/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Жб на сотрудников',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Напишите вашу жалобу в раздел 'Жалобы на сотрудников'. [/I][/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'В ЖБ на адм',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Вы ошиблись разделом, обратитесь в раздел жалоб на администрацию - [/I][URL='https://forum.blackrussia.online/index.php?forums/%D0%96%D0%B0%D0%BB%D0%BE%D0%B1%D1%8B-%D0%BD%D0%B0-%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8E.952/']*Нажмите сюда*[/URL][/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты данной темы в этом разделе, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Нужен фрапс',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][SIZE=4][FONT=times new roman][I]Для рассмотрения вашей жалобы нужно видео-доказательство. [/I][/FONT][/SIZE]<br><br>" +
            "[FONT=times new roman][SIZE=4][I]Просьба не создавать дубликаты данной темы, иначе ваш форумный аккаунт может быть заблокирован.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            "[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[COLOR=rgb(255, 0, 0)][SIZE=4][FONT=times new roman][I]Отказано.[/I][/FONT][/SIZE][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: '--------------------------------------------------------------------РП БИО-----------------------------------------------------------------------------',
        },
        {
            title: 'Одобрена',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография одобрена.[/COLOR][/I][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Отказана',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана.[/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/I][/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Заголовок не по форме' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к заголовок оформлен неправильно. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Не по форме' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к она составлена не по форме. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Не дополнил' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к вы ее не дополнили. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Неграмотная' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к она оформлена неграмотно. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'От 3-его лица' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к она написана от 3-его лица. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Уже одобрена' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к она уже была одобрена. [/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Супергерой' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к вы приписали суперспособности своему персонажу. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Копипаст' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к вы ее скопировали у другого человека. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'нонрп ник' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к у вас NonRP NickName. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)]PLATINUM[/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'ник англ' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к ваш NickName должен быть написан на русском языке. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'дата рождения с годом' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к дата рождения не совпадает с возрастом. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Нету 18 лет' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к ваш персонаж должен быть совершеннолетним. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'семья не полнос.' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к ваша семья расписана не полностью. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'дата рождения не полнос.' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к ваша дата рождения расписана не полностью. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'На доработке',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]В вашей RolePlay - биографии недостаточно информации.<br><br>" +
            "Даю вам 24 часа на ее дополнение.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: PIN_PREFIX,
            status: true,
        },
        {
            title: 'Мало инфы',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]В вашей RolePlay - биографии крайне мало информации.<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе.COLOR][COLOR=rgb(209, 213, 216)][/COLOR][/SIZE]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Создайте новую тему, дополнив ее новой информацией.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: '--------------------------------------------------------------------РП Организации--------------------------------------------------------------------'
        },
        {
            title: 'одобрено',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация одобрена.[/COLOR][/I][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'не туда' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана т.к вы не туда попали. [/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'не по форме' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана т.к она составлена не по форме. [/COLOR]<br><br>"+
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'отказ' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана. [/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'На доработке',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]В вашей RolePlay - организации недостаточно информации.<br><br>" +
            "Даю вам 24 часа на ее дополнение.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: PIN_PREFIX,
            status: true,
        },
        {
            title : 'ник англ' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана т.к ваш все никнеймы должны быть написаны на русском языке. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - организаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Неграмотная' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организаций отказана т.к она оформлена неграмотно. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - организаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Копипаст' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана т.к вы ее скопировали у другого человека. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - организаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Не дополнил' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана т.к вы ее не дополнили. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - организаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Заголовок не по форме' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - организация отказана т.к заголовок оформлен неправильно. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - организаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: '--------------------------------------------------------------------РП Ситуации--------------------------------------------------------------------'
        },
        {
            title: 'одобрено',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация одобрена.[/COLOR][/I][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'не туда' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к вы не туда попали. [/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'не по форме' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к она составлена не по форме. [/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'отказ' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана. [/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix:
            UNACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'На доработке',
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4][I]В вашей RolePlay - ситуации недостаточно информации.<br><br>" +
            "Даю вам 24 часа на ее дополнение.[/I][/SIZE][/FONT][/COLOR]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: PIN_PREFIX,
            status: true,
        },
        {
            title : 'ник англ' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к ваш все никнеймы должны быть написаны на русском языке. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - ситуаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Неграмотная' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к она оформлена неграмотно. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - ситуаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Копипаст' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к вы ее скопировали у другого человека. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - ситуаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)[/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Не дополнил' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к вы ее не дополнили. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - ситуаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
        {
            title : 'Заголовок не по форме' ,
            content:
            '[COLOR=rgb(255, 0, 0)][FONT=times new roman][SIZE=4][I]{{ greeting }}, уважаемый(ая) {{ user.mention }}.[/I][/FONT][/COLOR]<br><br>' +
            "[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - ситуация отказана т.к заголовок оформлен неправильно. [/COLOR]<br><br>" +
            "[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - ситуаций закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]<br><br>" +
            '[FONT=book antiqua][SIZE=4][COLOR=rgb(209, 213, 216)][I]Приятной игры на BLACK RUSSIA [/I][/COLOR][I][COLOR=rgb(0, 255, 255)][/COLOR][/I][/SIZE][/FONT][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4][I].[/SIZE][/FONT][/COLOR]',
            prefix: UNACCEPT_PREFIX,
            status: false,
        },
    ];


    $(document).ready(() => {
        // Загрузка скрипта для обработки шаблонов
        $('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');

        // Добавление кнопок при загрузке страницы
        addButton('На рассмотрение', 'pin');
        addButton('Одобрено', 'accepted');
        addButton('Отказано', 'unaccept');
        addButton('ГА', 'Ga');
        addButton('Теху', 'Texy');
        addButton('Меню', 'selectAnswer');
        addButton('Закрыть тему', 'zakroi');

        // Поиск информации о теме
        const threadData = getThreadData();

        $('button#pin').click(() => editThreadData(PIN_PREFIX, true));
        $('button#accepted').click(() => editThreadData(ACCEPT_PREFIX, false));
        $('button#Ga').click(() => editThreadData(GA_PREFIX, true));
        $('button#unaccept').click(() => editThreadData(UNACCEPT_PREFIX, false));
        $('button#Texy').click(() => editThreadData(TEX_PREFIX, true));
        $('button#Zakrito').click(() => editThreadData(CLOSE_PREFIX, false));
        $('button#zakroi').click(() => editThreadData(NULL_PREFIX, false));

        $(`button#selectAnswer`).click(() => {
            XF.alert(buttonsMarkup(buttons), null, 'Выберите ваш ответ:');
            buttons.forEach((btn, id) => {
                if (id > 0) {
                    $(`button#answers-${id}`).click(() => pasteContent(id, threadData, true));
                }
                else {
                    $(`button#answers-${id}`).click(() => pasteContent(id, threadData, false));
                }
            });
        });
    });

    function addButton(name, id) {
        $('.button--icon--reply').before(
            `<button type="button" class="button--primary button rippleButton" id="${id}" style="border-radius: 30px; margin-right: 7px;">${name}</button>`,
        );
    }

    function buttonsMarkup(buttons) {
        return `<div class="select_answer">${buttons
            .map(
            (btn, i) =>
            `<button id="answers-${i}" class="button--primary button ` +
            `rippleButton" style="margin:4px"><span class="button-text">${btn.title}</span></button>`,
        )
            .join('')}</div>`;
    }

    function pasteContent(id, data = {}, send = false) {
        const template = Handlebars.compile(buttons[id].content);
        if ($('.fr-element.fr-view p').text() === '') $('.fr-element.fr-view p').empty();

        $('span.fr-placeholder').empty();
        $('div.fr-element.fr-view p').append(template(data));
        $('a.overlay-titleCloser').trigger('click');

        if (send == true) {
            editThreadData(buttons[id].prefix, buttons[id].status);
            $('.button--icon.button--icon--reply.rippleButton').trigger('click');
        }
    }

    function getThreadData() {
        const authorID = $('a.username')[0].attributes['data-user-id'].nodeValue;
        const authorName = $('a.username').html();
        const hours = new Date().getHours();
        return {
            user: {
                id: authorID,
                name: authorName,
                mention: `[USER=${authorID}]${authorName}[/USER]`,
            },
            greeting: () =>
            6 < hours && hours <= 10
            ? 'Доброе утро'
            : 10 < hours && hours <= 18
            ? 'Добрый день'
            : 18 < hours && hours <= 6
            ? 'Добрый вечер'
            : 'Доброй ночи',
        };
    }

    function editThreadData(prefix, pin = false) {
        // Получаем заголовок темы, так как он необходим при запросе
        const threadTitle = $('.p-title-value')[0].lastChild.textContent;

        if(pin == false){
            fetch(`${document.URL}edit`, {
                method: 'POST',
                body: getFormData({
                    prefix_id: prefix,
                    title: threadTitle,
                    _xfToken: XF.config.csrf,
                    _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                    _xfWithData: 1,
                    _xfResponseType: 'json',
                }),
            }).then(() => location.reload());
        }
        if(pin == true){
            fetch(`${document.URL}edit`, {
                method: 'POST',
                body: getFormData({
                    prefix_id: prefix,
                    title: threadTitle,
                    sticky: 1,
                    _xfToken: XF.config.csrf,
                    _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                    _xfWithData: 1,
                    _xfResponseType: 'json',
                }),
            }).then(() => location.reload());
        }


        function moveThread(prefix, type) {
            // Получаем заголовок темы, так как он необходим при запросе
            const threadTitle = $('.p-title-value')[0].lastChild.textContent;

            fetch(`${document.URL}move`, {
                method: 'POST',
                body: getFormData({
                    prefix_id: prefix,
                    title: threadTitle,
                    target_node_id: type,
                    redirect_type: 'none',
                    notify_watchers: 1,
                    starter_alert: 1,
                    starter_alert_reason: "",
                    _xfToken: XF.config.csrf,
                    _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
                    _xfWithData: 1,
                    _xfResponseType: 'json',
                }),
            }).then(() => location.reload());
        }

        function getFormData(data) {
            const formData = new FormData();
            Object.entries(data).forEach(i => formData.append(i[0], i[1]));
            return formData;
        }
    }
})();
