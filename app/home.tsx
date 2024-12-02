import { StyledScrollView, StyledText, StyledView } from "@/components/StyledComponents"

const HomePage = () => {

    return (
        <StyledScrollView className="flex-1 px-4">
            <StyledText className="mb-4">Indicate day here</StyledText>
            <StyledView className="grid grid-cols-2 gap-4">
                <StyledView className="bg-blue-500 p-4">Item 1</StyledView>
                <StyledView className="bg-blue-500 p-4">Item 2</StyledView>
                <StyledView className="bg-blue-500 p-4">Item 3</StyledView>
                <StyledView className="bg-blue-500 p-4">Item 4</StyledView>
            </StyledView>
        </StyledScrollView>
    )
}

export default HomePage