import addDay from "@/app/highlights/addDay";

export const routes = {
    home: "index",
    signin: "auth/signin",
    registration: {
        part1: "auth/registration/reg_part1",
        part2: "auth/registration/reg_part2",
    },
    addDay: "highlights/addDay",
}