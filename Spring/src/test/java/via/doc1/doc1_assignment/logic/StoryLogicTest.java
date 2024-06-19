package via.doc1.doc1_assignment.logic;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import via.doc1.doc1_assignment.DTOs.StoryDTO;
import via.doc1.doc1_assignment.logic.StoryLogic;
import via.doc1.doc1_assignment.repository.interfaces.SQLConnectionInterface;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StoryLogicTest {

    private StoryLogic storyLogic;
    private SQLConnectionInterface connectionMock;

    @BeforeEach
    void setUp() {
        connectionMock = Mockito.mock(SQLConnectionInterface.class);
        storyLogic = new StoryLogic(connectionMock);
    }

    @Test
    void saveStory_successful() throws Exception {
        doNothing().when(connectionMock).saveStory(any(StoryDTO.class));

        storyLogic.saveStory("Header", "Content");

        verify(connectionMock, times(1)).saveStory(any(StoryDTO.class));
    }

    @Test
    void deleteStory_successful() throws Exception {
        String id = "STORY-" + UUID.randomUUID().toString();
        StoryDTO story = new StoryDTO(id, "Header", "Content", Timestamp.valueOf(LocalDateTime.now()));

        when(connectionMock.getStory(id)).thenReturn(story);
        doNothing().when(connectionMock).deleteStory(id);

        storyLogic.deleteStory(id);

        verify(connectionMock, times(1)).getStory(id);
        verify(connectionMock, times(1)).deleteStory(id);
    }

    @Test
    void deleteStory_notFound() {
        String id = "STORY-" + UUID.randomUUID().toString();
        when(connectionMock.getStory(id)).thenReturn(null);

        Exception exception = assertThrows(Exception.class, () -> {
            storyLogic.deleteStory(id);
        });

        assertEquals("No such story with id " + id, exception.getMessage());
    }

    @Test
    void getStories_successful() throws Exception {
        List<StoryDTO> stories = new ArrayList<>();
        stories.add(new StoryDTO("STORY-" + UUID.randomUUID().toString(), "Header", "Content", Timestamp.valueOf(LocalDateTime.now())));

        when(connectionMock.getStories()).thenReturn(stories);

        List<StoryDTO> result = storyLogic.getStories();

        assertEquals(1, result.size());
        verify(connectionMock, times(1)).getStories();
    }

    @Test
    void getStories_noStories() throws Exception {
        when(connectionMock.getStories()).thenReturn(new ArrayList<>());

        Exception exception = assertThrows(Exception.class, () -> {
            storyLogic.getStories();
        });

        assertEquals("No stories stored in the database", exception.getMessage());
    }

    @Test
    void editStory_successful() throws Exception {
        String id = "STORY-" + UUID.randomUUID().toString();
        StoryDTO story = new StoryDTO(id, "Header", "Content", Timestamp.valueOf(LocalDateTime.now()));

        when(connectionMock.getStory(id)).thenReturn(story);
        doNothing().when(connectionMock).editStory(any(StoryDTO.class));

        storyLogic.editStory(id, "New Header", "New Content");

        verify(connectionMock, times(1)).getStory(id);
        verify(connectionMock, times(1)).editStory(any(StoryDTO.class));
    }

    @Test
    void editStory_noChanges() {
        String id = "STORY-" + UUID.randomUUID().toString();
        StoryDTO story = new StoryDTO(id, "Header", "Content", Timestamp.valueOf(LocalDateTime.now()));

        when(connectionMock.getStory(id)).thenReturn(story);

        Exception exception = assertThrows(Exception.class, () -> {
            storyLogic.editStory(id, null, null);
        });

        assertEquals("No changes to edit", exception.getMessage());
    }

    @Test
    void editStory_notFound() {
        String id = "STORY-" + UUID.randomUUID().toString();
        when(connectionMock.getStory(id)).thenReturn(null);

        Exception exception = assertThrows(Exception.class, () -> {
            storyLogic.editStory(id, "Header", "Content");
        });

        assertEquals("No such story with id " + id, exception.getMessage());
    }
}
