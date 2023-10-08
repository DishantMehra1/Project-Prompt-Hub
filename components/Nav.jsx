'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import logo from '../public/nextjs_13_assets/assets/images/logo.svg'




const Nav = () => {
    const { data: session } = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropDown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }

        setUpProviders();
    }, [])


    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src={logo}
                    alt="logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Prompt Hub</p>
            </Link>

            {/* Desktop Navigation starts */}
            <div className="sm:flex hidden">
                {session?.user ?
                    (
                        <div className="flex gap-3 md:gap-5">
                            <Link href="/create-prompt" className="black_btn">Create Post</Link>
                            <button type="button" onClick={signOut} className="outline_btn">
                                Sign Out
                            </button>
                            <Link href="/profile">
                                <Image src={session?.user.image}
                                    width={37}
                                    height={37}
                                    className="rounded-full"
                                    alt="profile"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}

                        </>
                    )
                }
            </div>
            {/* Desktop Navigation ends */}

            {/* Mobile Navigation Starts */}
            <div className="sm:hidden fledx relative">
                {session?.user ?
                    (
                        <div className="flex">
                            <Image src={session?.user.image}
                                width={37}
                                height={37}
                                className="rounded-full"
                                alt="profile"
                                onClick={() => setToggleDropdown((prev) => !prev)} //react doesn't recommend updating state directly
                            />

                            {toggleDropDown && (
                                <div className="dropdown">
                                    <Link className="dropdown_list"
                                        href="/profile"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link className="dropdown_list"
                                        href="/create-prompt"
                                        onClick={() => setToggleDropdown(false)}
                                    >
                                        Create Prompt
                                    </Link>
                                    <button
                                        className="mt-5 w-full black_btn"
                                        type="button"
                                        onClick={() => {
                                            setToggleDropdown(false);
                                            signOut();
                                        }}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            {providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}

                        </>
                    )
                }
            </div>
            {/* Mobile Navigation Ends  */}

        </nav>
    )
}

export default Nav;