import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../testing/render";
import CreateUser from "./CreateUser";

it("check registration with no fields", async () => {
    const createUserSpy = jest.fn((context, args) => ({}));

    render(<CreateUser />, {
        mockTypes: {
            User: () => ({
                firstName: "Joe",
            }),
        },
        mocks: {
            Mutation: {
                createUser: createUserSpy,
            },
        },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => expect(createUserSpy).toHaveBeenCalled());

    expect(createUserSpy.mock.calls[0][1]).toEqual({
        input: {
            firstName: "",
            surName: "",
            age: 0,
            occupation: "",
        },
    });
});
