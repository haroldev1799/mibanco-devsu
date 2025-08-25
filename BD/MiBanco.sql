-- Table Person
CREATE TABLE person (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    gender NVARCHAR(20),
    age INT,
    identification NVARCHAR(20) UNIQUE NOT NULL,
    address NVARCHAR(150),
    phone NVARCHAR(20)
);

-- Table Client (inherits from Person)
CREATE TABLE client (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    person_id BIGINT NOT NULL UNIQUE,
    password NVARCHAR(100) NOT NULL,
    status BIT DEFAULT 1,
    FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE
);

-- Table Account
CREATE TABLE account (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    account_number BIGINT,
    type NVARCHAR(50) NOT NULL,
    initial_balance DECIMAL(12,2) DEFAULT 0,
    status BIT DEFAULT 1,
    client_id BIGINT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client(id) ON DELETE CASCADE
);

-- Table Movement
CREATE TABLE movement (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    date DATE NOT NULL,
    transaction_type NVARCHAR(50) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    balance DECIMAL(12,2) NOT NULL,
    account_id BIGINT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);



GO
CREATE PROCEDURE [dbo].[GET_ALL_PERSON]

AS
BEGIN
    SELECT * FROM dbo.persona
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PERSON_GET_BY_ID]
@PersonId BIGINT
AS
BEGIN
    SELECT * FROM dbo.persona WHERE ID = @PersonId
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ACCOUNT_GET_ALL]

AS
BEGIN
    SELECT * FROM dbo.account
END

SET ANSI_NULLS ON
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ACCOUNT_GET_BY_ID]
@AccountNumberId BIGINT
AS
BEGIN
    SELECT * FROM dbo.account WHERE account_number = @AccountNumberId
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CLIENT_GET_ALL]

AS
BEGIN
    SELECT
        c.*,
        p.name,
        p.gender,
        p.age,
        p.address,
        p.identification,
        p.phone
    FROM dbo.client C INNER JOIN dbo.person P ON C.person_id = P.id
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CLIENT_GET_BY_ID]
@ClienteId BIGINT
AS
BEGIN
    SELECT
        c.*,
        p.name,
        p.gender,
        p.age,
        p.address,
        p.identification,
        p.phone
    FROM dbo.client C INNER JOIN dbo.person P ON C.person_id = P.id
    WHERE C.id = @ClienteId
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[MOVEMENT_GET_ALL]

AS
BEGIN
    SELECT * FROM dbo.movement
END

SET ANSI_NULLS ON
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[MOVEMENT_GET_BY_ID]
@MovementId BIGINT
AS
BEGIN
    SELECT * FROM dbo.movement WHERE id = @MovementId
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[MOVEMENT_GET_MOVEMENTS_BY_ACCOUNT_DATE]
@AccountId BIGINT,
@Date DATE
AS
BEGIN
    SELECT id,
       date,
       transaction_type,
       amount,
       balance,
       account_id
    FROM movement
    WHERE account_id = @AccountId
    AND CAST(date AS DATE) = @Date;
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PERSON_GET_ALL]

AS
BEGIN
    SELECT * FROM dbo.person
END

SET ANSI_NULLS ON
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PERSON_GET_BY_ID]
@PersonId BIGINT
AS
BEGIN
    SELECT * FROM dbo.person WHERE ID = @PersonId
END
GO

