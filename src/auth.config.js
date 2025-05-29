import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { Strategy as GitHubStrategy } from "passport-github2";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/google",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return googleVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};

export const githubStrategy = new GitHubStrategy(
    {
        clientID: process.env.PASSPORT_GITHUB_CLIENT_ID,
        clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/github",
        scope: ["user:email"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return githubVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const githubVerify = async (profile) => {
    const email = profile.emails?.find((e) => e.primary && e.verified)?.value ||
        profile.emails?.[0]?.value;
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};

export const naverStrategy = new NaverStrategy(
    {
        clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
        clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/oauth2/callback/naver",
        state: true, //CSRF 방지용도 
    },
    (accessToken, refreshToken, profile, cb) => {
        return naverVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const naverVerify = async (profile) => {
    const email = profile.email;

    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.name || profile.nickname,
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};

export const kakaoStrategy = new KakaoStrategy(
    {
        clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
        callbackURL: "http://localhost:3000/oauth2/callback/kakao",
        scope: ["email", "profile"],
        state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
        return kakaoVerify(profile)
            .then((user) => cb(null, user))
            .catch((err) => cb(err));
    }
);

const kakaoVerify = async (profile) => {
    const email = profile._json?.kakao_account?.email;
    if (!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
        return { id: user.id, email: user.email, name: user.name };
    }

    const created = await prisma.user.create({
        data: {
            email,
            name: profile.displayName,
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
        },
    });

    return { id: created.id, email: created.email, name: created.name };
};