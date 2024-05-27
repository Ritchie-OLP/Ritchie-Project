import { LoginPage } from '../scenes/public/login';
import { HomeScene } from '../scenes/private/home';
import { ReportScene } from '../scenes/private/reports';
import { SettingsScene } from '../scenes/private/settings';
import { UserScene } from '../scenes/private/users';
import { ForumScene } from '../scenes/private/forum';
import { Showcases } from '../scenes/private/showcases';
import { RegisterPage } from '../scenes/public/register';
import { ChallengeScene } from '../scenes/private/challenges/challenge';
import { LanguageScenes } from '../scenes/private/routes/languages/language';
import { Modules } from '../scenes/private/routes/languages/modules';
import { Userview } from '../scenes/private/users-view';
import { ConsoleHTML } from '../scenes/private/consolehtml'
import {ConsoleCSS } from '../scenes/private/consolecss'
import { ConsoleJS } from '../scenes/private/consolejs';

export const routes = {
    private: [
        { path: '/dashboard', component: HomeScene },
        { path: '/dashboard/reports', component: ReportScene },
        { path: '/dashboard/settings', component: SettingsScene },
        { path: '/dashboard/users', component: UserScene },
        { path: '/dashboard/forum', component: ForumScene},
        { path: '/dashboard/show-cases', component: Showcases },
        { path: '/dashboard/challenges', component: ChallengeScene },
        { path: '/dashboard/routes/languages', component: LanguageScenes },
        { path: '/dashboard/routes/languages/module', component: Modules },
        { path: '/dashboard/user-view', component: Userview },
        { path: '/dashboard/console-html', component:  ConsoleHTML },
        { path: '/dashboard/console-css', component: ConsoleCSS },
        { path: 'dashboard/console-js', component: ConsoleJS }

    ],
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage }
    ]
};