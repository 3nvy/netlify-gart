import { screen, waitFor } from "@testing-library/react";
import { render } from "../../testing/render";
import UserDetails from "./UserDetails";

it("check if array of users is listed correctly", async () => {
    const getUserSpy = jest.fn((context, args) => ({}));

    render(<UserDetails />, {
        mockTypes: {
            User: () => ({
                firstName: "Joe",
            }),
        },
        mocks: {
            Query: {
                user: getUserSpy,
            },
        },
    });

    await waitFor(() => expect(getUserSpy).toHaveBeenCalled());

    expect(getUserSpy.mock.calls[0][1]).toEqual({ id: "" });
    expect(await screen.findByText(/Joe/i)).toBeInTheDocument();
});
