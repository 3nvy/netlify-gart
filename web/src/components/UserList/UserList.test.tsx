import { screen } from "@testing-library/react";
import { render } from "../../testing/render";
import UserList from "./UserList";

it("check if array of users is listed correctly", async () => {
    render(<UserList />, {
        mocks: {
            Query: {
                users: () => [
                    { firstName: "Tad", surName: "kylie" },
                    { firstName: "Stacia", surName: "Laurene" },
                ],
            },
        },
    });

    await screen.findByText(/tad kylie/i);
    await screen.findByText(/stacia laurene/i);
});

it("check if error message is displayed when query fails", async () => {
    render(<UserList />, {
        mocks: {
            Query: {
                users: () => {
                    throw Error();
                },
            },
        },
    });

    await screen.findByText(/Something Went Wrong/i);
});
